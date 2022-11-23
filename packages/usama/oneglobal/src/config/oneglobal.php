<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 5:56 PM
 */
return [
    'mode' => env('PAYPAL_MODE', 'live'),
    'one_global_merchant_id' => env('ONEGLOBAL_MERCHANT_ID'),
    'one_global_auth_key' => env('ONEGLOBAL_AUTH_KEY'),
    'one_global_secret_key' => env('ONEGLOBAL_SECRET_KEY'),
    'one_global_end_point' => env('ONEGLOBAL_END_POINT'),
    'one_global_callback_url' => env('ONEGLOBAL_CALLBACK_URL'),
    'currency' => env('PAYPAL_CURRENCY', "KWD"),
    'order' => env('ORDER_MODEL_PATH') ? env('ORDER_MODEL_PATH') : 'App\Order'
];
