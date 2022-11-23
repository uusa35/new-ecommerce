<?php

namespace Usama\Tap\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\OrderSuccessProcessJob;
use App\Jobs\sendSuccessOrderEmail;
use App\Mail\OrderFailed;
use App\Models\Ad;
use App\Models\Coupon;
use App\Models\Setting;
use App\Models\Deal;
use App\Models\Order;
use App\Models\OrderAttribute;
use App\Models\Plan;
use App\Models\User;
use App\Services\Traits\OrderTrait;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Mail;

/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 6:04 PM
 */
class TapPaymentController extends Controller
{
    use TapTrait, OrderTrait;

    public function makePayment(Request $request)
    {
        try {
            $validator = validator($request->all(), [
                'netTotal' => 'required|numeric',
                'order_id' => 'required|exists:orders,id',
                'paymentMethod' => 'required|string'
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator->errors()->first());
            }
            $payment = json_decode($this->processPayment($request->order_id));
            if ($payment) {
                $this->updateOrderRerferenceId($request->order_id, $payment->id, $request->paymentMethod);
                return response()->json($payment->transaction->url, 200);
            }
        } catch (\Exception $e) {
            dd(404, $e->getMessage());
        }
    }

    public function result(Request $request)
    {
        // once the result is success .. get the deal from refrence then delete all other free deals related to such ad.
        $validate = validator($request->all(), [
            'ref' => 'required'
        ]);
        $settings = Setting::first();
        $order = Order::where(['reference_id' => $request->has('ref') ? $request->ref : 0])->with([
            'order_metas.product.user',
            'user', 'order_metas.product_attribute.size',
            'order_metas.product_attribute.color',
            'order_metas.service.user'
        ])->first();
        if ($validate->fails() || !$order) {
            Mail::to($settings->email)->send(new OrderFailed($order, $settings, 'Tap Result Case #1 : Order Does not exist or ref Id was not attached to request.'));
            return abort('404', 'Your payment process is unsuccessful .. your deal is not created please try again or contact us.');
        }
        $order->update(['status' => 'success', 'paid' => true]);
        $this->decreaseQty($order);
        $markdown = new Markdown(view(), config('mail.markdown'));
//        OrderSuccessProcessJob::dispatchNow($order, $order->user);
        OrderSuccessProcessJob::dispatch($order, $order->user)->delay(now()->addSeconds(15));
//         $this->orderSuccessAction($referenceId->InvoiceId);
        return $markdown->render('emails.order-complete', ['order' => $order, 'user' => $order->user]);
    }

    public function error(Request $request)
    {
        try {
            $order = Order::withoutGlobalScopes()->where(['reference_id' => $request->ref])->first();
            if ($order) {
                $order->update(['status' => 'failed']);
            }
            $settings = Setting::first();
            Mail::to($settings->email)->send(new OrderFailed($order, $settings, 'Tap Error Case#1'));
            return abort('404', 'Your payment process is unsuccessful .. your deal is not created please try again or contact us.');
        } catch (\Exception $e) {
            Mail::to($settings->email)->send(new OrderFailed('', $settings, 'Tap Error Case #2 : ' . $e->getMessage()));
            return abort('404', 'Your payment process is unsuccessful .. your deal is not created please try again or contact us.');
        }
    }

    public function tapReturn(Request $request)
    {
        try {
            $validate = validator($request->all(), [
                'tap_id' => 'required'
            ]);
            if ($validate->fails()) {
                return redirect()->route('frontend.home')->with(['error' => trans('general.process_failure')]);
            }
            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://api.tap.company/v2/charges/" . $request->tap_id,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_POSTFIELDS => "{}",
                CURLOPT_HTTPHEADER => array(
                    "authorization: Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ"
                ),
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);

            curl_close($curl);

            if ($err) {
//            echo "cURL Error #:" . $err;
//                return redirect()->route('frontend.home')->with('error', trans('process_failure'));
                abort(404, $err);
            } else {
                $res = json_decode($response);
                // ABANDONED, CANCELLED, FAILED, DECLINED, RESTRICTED, CAPTURED, VOID,TIMEDOUT, UNKNOWN
//                dd($res->status);
                if ($res->status === 'CAPTURED') {
                    return $this->orderSuccessAction($res->id);
                } else {
                    abort(404, trans('general.order_failed'));
                }
            }
        } catch (\Exception $e) {
            abort(404, $e->getMessage());
        }
    }

    public function tapPost(Request $request)
    {
        var_dump('post');
        dd($request->all());
    }
}
