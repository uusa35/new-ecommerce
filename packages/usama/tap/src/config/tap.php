<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 5:56 PM
 */
return [
    'apiKey' => env('TAP_API_KEY', 'tap7'), //Your API Key Provided by Tap
    'merchantId' => env('TAP_MERCHANT_ID', 1014), //Your ID provided by Tap
    'userName' => env('TAP_USERNAME', "test"), //Your Username under TAP.
    "password" => "test",
    'currencyCode' => env('TAP_CURRENCY_CODE', "KWD"), //This is the currency of the invoice you are creating. (Details can be found in "Create a Payment" endpoint)
    "autoReturn" => env('TAP_AUTO_RETURN', "Y"),
    "errorUrl" => env('TAP_ERROR_URL', "https://github.com/nosuchpage"),
    "langCode" => env('TAP_LANG_CODE', "EN"),
    "postUrl" => env('TAP_POST_URL', "https://yourdomain.post.com"),
    "returnUrl" => env('TAP_RETURN_URL', "https://yourdomain.return.com"),
    'gatewayDefault' => "ALL",
    'paymentUrl' => env('TAP_PAYMENT_URL','https://wwww.gotapnow.com/TapWebConnect/Tap/WebPay/PaymentRequest'),
    'order' => env('ORDER_MODEL_PATH') ? env('ORDER_MODEL_PATH') : 'App\Order'
];
