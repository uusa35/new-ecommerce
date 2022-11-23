<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 6:04 PM
 */

Route::group(['namespace' => 'Usama\Upayment\Controllers'], function () {
    Route::group(['middleware' => 'api'], function () {
        Route::post('api/upayment/payment', 'UPaymentController@makePaymentApi')->name('upayment.api.payment.create');
    });


    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::post('upayment/payment', 'UPaymentController@makePayment')->name('upayment.web.payment.create');
    });
    Route::group(['middleware' => ['web']], function () {
        Route::get('upayment/result', 'UPaymentController@result')->name('upayment.web.payment.result');
        Route::get('upayment/error', 'UPaymentController@error')->name('upayment.web.payment.error');
    });
});





