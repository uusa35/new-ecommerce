<?php

namespace Usama\OneGlobal\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\OrderSuccessProcessJob;
use App\Mail\OrderPaid;
use App\Models\Order;
use App\Models\Setting;
use App\Services\Traits\OrderTrait;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Mail;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

class OneGlobalController extends Controller
{
    use OrderTrait;

    public function makePayment(Request $request)
    {
        try {
            // 1- prepare data
            // 2- update order with the reference_id
            // 3- return the paymentURL
            $validator = validator($request->all(), [
                'netTotal' => 'required|numeric',
                'order_id' => 'required|exists:orders,id',
                'paymentMethod' => 'required|string'
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator->errors()->first());
            }
            // Step 2.1 : Between Step 2 and Step 3
// store order id
            $order = $request->order_id;
// referenceID must be 15 digit unique number
            $referenceID = 123456412250000;
            $timestamp = date("y/m/d H:m:s t");
// referenceID must be 10 digit unique number
            $userReference = 1234564122;
            $amount = (float) 20.50;
            $secretKey = config('oneglobal.one_global_secret_key');
            $authKey = config('oneglobal.one_global_auth_key');
            $merchantID = config('oneglobal.one_global_merchant_id');
            $currency = 'KWD';
// it should be ALL for all payment methods or specific payment method code i.e KNET
            $paymentMethodCode = 'KNET';
// it will be null if store currency is same as your merchant currency.
            $sourceCurrency = "";
// It will be Y if source currency and merchant currency is different
            $doConvert = 'N';
            $endpoint = config('oneglobal.one_global_end_point');
            $tunnel = config('oneglobal.one_global_end_point');
// Concat all data string
            $datatocomputeHash = $amount . $authKey . $currency . $merchantID . $paymentMethodCode . $referenceID . $sourceCurrency . $timestamp . $tunnel . $userReference;
// convert the concated string in to hash and convert all string in upper character.
            $hash = strtoupper(hash_hmac("sha256", $datatocomputeHash, $secretKey));
            $data = array(
                'merchantCode' => $merchantID,
                'authKey' => $authKey,
                'currency' => $currency,
                'pc' => $paymentMethodCode,
                'tunnel' => config('oneglobal.one_global_end_point'),
                'amount' => $amount,
                'doConvert' => $doConvert,
                'sourceCurrency' => $sourceCurrency,
                'description' => 'whatever des',
                'referenceID' => $referenceID,
                'timeStamp' => $timestamp,
                'language' => 'en',
                'callbackURL' => config('oneglobal.one_global_callback_url'),
                'hash' => $hash,
                'userReference' => $userReference,
                'billingDetails' => array(
                    'fName' => 'First Name',
                    'lName' => 'Last Name',
                    'mobile' => '0000000000',
                    'email' => 'abcd@gmail.com',
                    'city' => 'city',
                    'pincode' => '000000',
                    'state' => 'State',
                    'address1' => 'Address 1',
                    'address2' => 'Address 2'
                ),
            );
            $req = json_encode($data, true);
            dd($req);
            if (!$endpoint) {
                $curl = curl_init('https://ogcheckoutstage.oneglobal.com/OgPay/V1/api/GenToken/Validate');
            } else {
                $curl = curl_init($endpoint);
            }
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $req);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
            $ch = curl_exec($curl);
            curl_close($curl);
            $response = json_decode($ch, true);
            return ($response);


//            $this->updateOrderRerferenceId($request->order_id, $payment->id, $request->paymentMethod);
//            return response()->json($approvalUrl, 200);

            // Redirect the customer to $approvalUrl

        } catch (PayPal\Exception\PayPalConnectionException $ex) {
            dd('code : ' . $ex->getCode() . 'data :' . $ex->getData());
        } catch (Exception $ex) {
            die($ex);
        }
    }

    public function result(Request $request)
    {
        $validator = validator($request->all(), [
            'paymentId' => 'required'
        ]);
        if ($validator->fails()) {
            return redirect()->route('frontend.home')->with('error', trans('process_failure'));
        }
        return $this->orderSuccessAction($request->paymentId);
    }

    public function cancel()
    {
        return redirect()->route('frontend.home')->with('error', trans('process_failure'));
    }
}
