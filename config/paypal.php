<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 5:56 PM
 */
return [
    'mode' => env('PAYPAL_MODE', 'live'),
    'sandbox_secret_client_id' => env('PAYPAL_SANDBOX_CLIENT_ID'),
    'sandbox_client_secret' => env('PAYPAL_SANDBOX_CLIENT_SECRET'),
    'live_secret_client_id' => env('PAYPAL_LIVE_CLIENT_ID'),
    'live_client_secret' => env('PAYPAL_LIVE_CLIENT_SECRET'),
    'currency' => env('PAYPAL_CURRENCY', "USD"),
    'order' => env('ORDER_MODEL_PATH') ? env('ORDER_MODEL_PATH') : 'App\Order'
];
