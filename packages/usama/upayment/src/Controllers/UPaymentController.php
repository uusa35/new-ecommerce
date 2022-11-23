<?php

namespace Usama\Upayment\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\OrderSuccessProcessJob;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;

/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 6:04 PM
 */
class UPaymentController extends Controller
{

    use UpaymentTrait;

    public function makePaymentApi(Request $request)
    {
        $order = $this->checkCart($request); // check cart then create order
        if (is_string($order)) {
            return response()->json(['message' => $order], 400);
        }
        $user = User::whereId($order->user_id)->first();
        $paymentUrl = $this->processPayment($order, $user);
        if ($paymentUrl) {
            return response()->json(['paymentUrl' => $paymentUrl], 200);
        }
        return response()->json(['message' => 'No Payment Url created'], 400);
    }

    public function makePayment(Request $request)
    {
        $validate = validator($request->all(), [
            'order_id' => 'required|numeric|exists:orders,id',
        ]);
        if ($validate->fails()) {
            return redirect()->back()->with('errors', $validate->errors());
        }
        $className = env('ORDER_MODEL_PATH');
        $order = new $className();
        $order = $order->whereId($request->order_id)->with('order_metas.product', 'order_metas.product_attribute')->first();
        $user = auth()->user();
        $paymentUrl = $this->processPayment($order, $user);
        if ($paymentUrl) {
            return redirect()->to($paymentUrl);
        }
        abort(404, 'Payment Url Failed');
    }

    public function result(Request $request)
    {
        // once the result is success .. get the deal from refrence then delete all other free deals related to such ad.
        $validate = validator($request->all(), [
            'PaymentID' => 'required'
        ]);
        if ($validate->fails()) {
            throw new \Exception($validate->errors()->first());
        }
        $referenceId = $request->OrderID;
        $order = Order::where(['id' => $referenceId])->with('order_metas.product', 'user', 'order_metas.product_attribute.size', 'order_metas.product_attribute.color')->first();
        $order->update(['status' => 'success', 'paid' => true]);
        $this->decreaseQty($order);
        $markdown = new Markdown(view(), config('mail.markdown'));
        OrderSuccessProcessJob::dispatchNow($order, $order->user);
//        OrderSuccessProcessJob::dispatch($order, $order->user)->delay(now()->addSeconds(15));
        $this->clearCart();
        return $markdown->render('emails.order-complete', ['order' => $order, 'user' => $order->user]);
    }

    public function error(Request $request)
    {
        // once the result is success .. get the deal from refrence then delete all other free deals related to such ad.
        $validate = validator($request->all(), [
            'PaymentID' => 'required'
        ]);
        if ($validate->fails()) {
            throw new Excption($validate->errors()->first());
        }
        $referenceId = $request->OrderID;
        $order = Order::withoutGlobalScopes()->where(['id' => $referenceId])->first();
        if ($order) {
            $order->update(['status' => 'failed']);
        }
        abort('404', 'Your payment process is unsuccessful .. your deal is not created please try again or contact us.');
    }

}

