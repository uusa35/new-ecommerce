<?php

namespace Usama\Paypal\Controllers;

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

class PaypalController extends Controller
{
    use OrderTrait;

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
            $clientId = env('PAYPAL_MODE') === 'sandbox' ? config('paypal.sandbox_secret_client_id') : config('paypal.live_secret_client_id');
            $clientSecret = env('PAYPAL_MODE') === 'sandbox' ? config('paypal.sandbox_client_secret') : config('paypal.live_client_secret');
            $apiContext = new \PayPal\Rest\ApiContext(new \PayPal\Auth\OAuthTokenCredential($clientId, $clientSecret));
            // Step 2.1 : Between Step 2 and Step 3
            $apiContext->setConfig(
                array(
                    'mode' => config('paypal.mode'),
//                    'log.LogEnabled' => true,
//                    'log.FileName' => '../PayPal.log',
                    //'log.LogLevel' => 'DEBUG', // PLEASE USE `INFO` LEVEL FOR LOGGING IN LIVE ENVIRONMENTS
                    //'cache.enabled' => true,
                    //'cache.FileName' => '/PaypalCache' // for determining paypal cache directory
                    // 'http.CURLOPT_CONNECTTIMEOUT' => 30
                    // 'http.headers.PayPal-Partner-Attribution-Id' => '123123123'
                    //'log.AdapterFactory' => '\PayPal\Log\DefaultLogFactory' // Factory class implementing \PayPal\Log\PayPalLogFactory
                )
            );
//            dd($apiContext);
            // Create new payer and method
            $payer = new Payer();
            $payer->setPaymentMethod("paypal");

            // Set redirect URLs
            $redirectUrls = new RedirectUrls();
            $redirectUrls->setReturnUrl(route('paypal.web.payment.result'))
                ->setCancelUrl(route('paypal.web.payment.cancel'));

            // Set payment amount
            $amount = new Amount();
            $amount->setCurrency("USD")
                ->setTotal($request->netTotal);

            // Set transaction object
            $transaction = new Transaction();
            $transaction->setAmount($amount)
                ->setDescription("Payment description");

            // Create the full payment object
            $payment = new Payment();
            $payment->setIntent('sale')
                ->setPayer($payer)
                ->setRedirectUrls($redirectUrls)
                ->setTransactions(array($transaction));
            // Create payment with valid API context
            $payment->create($apiContext);
            // Get PayPal redirect URL and redirect the customer
            $approvalUrl = $payment->getApprovalLink();
            $this->updateOrderRerferenceId($request->order_id, $payment->id, $request->paymentMethod);
            return response()->json($approvalUrl, 200);

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
