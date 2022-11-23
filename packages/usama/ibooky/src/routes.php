<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 6:04 PM
 */
Route::group(['namespace' => 'Usama\Ibooky\Controllers'], function () {
    Route::group(['middleware' => 'api'], function () {
        Route::post('api/ibooky/payment', 'IbookyController@makePaymentApi')->name('ibooky.api.payment.create');
    });

    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::post('ibooky/payment', 'IbookyController@makePayment')->name('ibooky.web.payment.create');
    });
    Route::group(['middleware' => ['web']], function () {
        Route::get('ibooky/result', 'IbookyController@result')->name('ibooky.web.payment.result');
        Route::get('ibooky/error', 'IbookyController@error')->name('ibooky.web.payment.error');
    });
});





