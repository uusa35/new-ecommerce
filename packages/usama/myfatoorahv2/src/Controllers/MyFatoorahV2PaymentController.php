<?php

namespace Usama\MyFatoorahV2\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\OrderSuccessProcessJob;
use App\Mail\OrderFailed;
use App\Models\Coupon;
use App\Models\Setting;
use App\Models\Order;
use App\Models\User;
use App\Services\Traits\OrderTrait;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Mail;
use Usama\MyFatoorahV2\MyfatoorahApiV2;
use Usama\MyFatoorahV2\PaymentMyfatoorahApiV2;
use function Usama\MyFatoorahV2\directPayment;
use function Usama\MyFatoorahV2\executePayment;

/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 6:04 PM
 */
class MyFatoorahV2PaymentController extends Controller
{

    use MyFatoorahV2Trait, OrderTrait;
    public $myFatoorahInstance;
    public function __construct() {
        $this->myFatoorahInstance =  new PaymentMyfatoorahApiV2();
    }

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
            /* ------------------------ Configurations ---------------------------------- */
//Test
//            $apiURL = 'https://apitest.myfatoorah.com';
            $apiKey = ''; //Test token value to be placed here: https://myfatoorah.readme.io/docs/test-token

//Live
//$apiURL = 'https://api.myfatoorah.com';
//$apiKey = ''; //Live token value to be placed here: https://myfatoorah.readme.io/docs/live-token


            /* ------------------------ Call InitiatePayment Endpoint ------------------- */
//Fill POST fields array
            $ipPostFields = ['InvoiceAmount' => request()->netTotal, 'CurrencyIso' => 'KWD'];

//Call endpoint

//            $methods = collect($paymentMethods->initiatePayment(config('myfatoorah.apiUrl'), config('myfatoorah.apiKey'), $ipPostFields));

//You can save $paymentMethods information in database to be used later
//            foreach ($paymentMethods as $pm) {
//                if ($pm->PaymentMethodEn == 'Visa/Master Direct 3DS Flow' && $pm->IsDirectPayment) {
//                    $paymentMethodId = $pm->PaymentMethodId;
//                    break;
//                }
//            }

            /* ------------------------ Call ExecutePayment Endpoint -------------------- */
//Fill customer address array
            /* $customerAddress = array(
              'Block'               => 'Blk #', //optional
              'Street'              => 'Str', //optional
              'HouseBuildingNo'     => 'Bldng #', //optional
              'Address'             => 'Addr', //optional
              'AddressInstructions' => 'More Address Instructions', //optional
              ); */

//Fill invoice item array
            /* $invoiceItems[] = [
              'ItemName'  => 'Item Name', //ISBAN, or SKU
              'Quantity'  => '2', //Item's quantity
              'UnitPrice' => '25', //Price per item
              ]; */

//Fill POST fields array
            $postFields = [
                //Fill required data
                'NotificationOption' => 'Lnk', //'SMS', 'EML', or 'ALL'
//                'paymentMethodId' => $methods->where('PaymentMethodId', 1)->first()->PaymentMethodId,
                'InvoiceValue' => $request->netTotal,
                'CallBackUrl' => route('myfatoorahv2.web.payment.result'),
                'ErrorUrl' => route('myfatoorahv2.web.payment.error'), //or 'https://example.com/error.php'
                //Fill optional data
                'CustomerName'       => config('app.name'),
                //'DisplayCurrencyIso' => 'KWD',
                //'MobileCountryCode'  => '+965',
                //'CustomerMobile'     => '1234567890',
                //'CustomerEmail'      => 'email@example.com',
                //'Language'           => 'en', //or 'ar'
                //'CustomerReference'  => 'orderId',
                //'CustomerCivilId'    => 'CivilId',
                //'UserDefinedField'   => 'This could be string, number, or array',
                //'ExpiryDate'         => '', //The Invoice expires after 3 days by default. Use 'Y-m-d\TH:i:s' format in the 'Asia/Kuwait' time zone.
                //'SourceInfo'         => 'Pure PHP', //For example: (Laravel/Yii API Ver2.0 integration)
                //'CustomerAddress'    => $customerAddress,
                //'InvoiceItems'       => $invoiceItems,
            ];
//Call endpoint
            $payment = $this->myFatoorahInstance->sendPayment(config('myfatoorah.apiUrl'), config('myfatoorah.apiKey'), $postFields);

//You can save payment data in database as per your needs
            $invoiceId = $payment->InvoiceId;
            $paymentURL = $payment->InvoiceURL;
            $this->updateOrderRerferenceId($request->order_id, $payment->InvoiceId, $request->paymentMethod);

//            return response()->json($paymentURL, 200);

            /* ------------------------ Call DirectPayment Endpoint --------------------- */
//Fill POST fields array
            $cardInfo = [
                'PaymentType' => 'card',
                'Bypass3DS' => false,
                'Card' => [
                    'Number' => '5123450000000008',
                    'ExpiryMonth' => '05',
                    'ExpiryYear' => '21',
                    'SecurityCode' => '100',
                    'CardHolderName' => 'fname lname'
                ]
            ];

//Call endpoint
//            $directData = $paymentMethods->directPayment($paymentURL, config('myfatoorah.apiKey'), $cardInfo);
//            dd($directData);

//You can save payment data in database as per your needs
//            $paymentId = $directData->PaymentId;
//            $paymentLink = $directData->PaymentURL;

            return response()->json($paymentURL, 200);
//Redirect your customer to the OTP page to complete the payment process
//Display the payment link to your customer
            echo "Click on <a href='$paymentLink' target='_blank'>$paymentLink</a> to pay with payment ID: $paymentId, and invoice ID: $invoiceId.";
            die;


//            $this->updateOrderRerferenceId($request->order_id, $data['invoiceId']);
//            return $data['invoiceURL'];

        } catch (\Exception $ex) {
            dd($ex);
        }
    }

    public function result(Request $request)
    {
        // once the result is success .. get the deal from refrence then delete all other free deals related to such ad.
        $validate = validator($request->all(), [
            'paymentId' => 'required'
        ]);
        if($validate->fails()) {
            abort('400',trans('general.process_failure'));
        }
        $referenceId = $this->myFatoorahInstance->getInvoiceId(config('myfatoorah.apiUrl'), config('myfatoorah.apiKey'), $request->has('paymentId') ? $request->paymentId : $request->Id);
        return $this->orderSuccessAction($referenceId->InvoiceId);
    }

    public function error(Request $request)
    {
        // once the result is success .. get the deal from refrence then delete all other free deals related to such ad.
        try {
            $settings = Setting::first();
            $referenceId = $this->myFatoorahInstance->getInvoiceId(config('myfatoorah.apiUrl'), config('myfatoorah.apiKey'), $request->has('paymentId') ? $request->paymentId : $request->Id);
            $order = Order::withoutGlobalScopes()->where(['reference_id' => $referenceId->InvoiceId])->first();
            if ($order) {
                $order->update(['status' => 'failed']);
            }
            Mail::to($settings->email)->cc($order->user->email)->send(new OrderFailed($order));
            $markdown = new Markdown(view(), config('mail.markdown'));
            return $markdown->render('emails.orders.failed', ['order' => $order]);

        } catch (\Exception $e) {
            Mail::to($settings->email)->cc($order->user->email)->send(new OrderFailed($order));
            abort('404', 'Your payment process is unsuccessful .. your deal is not created please try again or contact us.');
        }
    }

}

