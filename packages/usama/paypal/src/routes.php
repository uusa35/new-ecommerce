<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 6:04 PM
 */
Route::group(['namespace' => 'Usama\Paypal\Controllers'], function () {
    Route::group(['middleware' => 'api'], function () {
        Route::post('api/paypal/payment', 'PaypalController@makePayment')->name('paypal.api.payment.create');
    });

    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::post('paypal/payment', 'PaypalController@makePayment')->name('paypal.web.payment.create');
    });
    Route::group(['middleware' => ['web']], function () {
        Route::get('paypal/result', 'PaypalController@result')->name('paypal.web.payment.result');
        Route::get('paypal/error', 'PaypalController@cancel')->name('paypal.web.payment.cancel');
    });
});





