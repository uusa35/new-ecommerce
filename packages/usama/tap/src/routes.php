<?php


Route::group(['namespace' => 'Usama\Tap\Controllers'], function () {
    Route::group(['middleware' => 'api'], function () {
        Route::post('api/tap/payment', 'TapPaymentController@makePayment')->name('tap.api.payment.create');
    });

    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::post('tap/payment', 'TapPaymentController@makePayment')->name('tap.web.payment.create');
    });
    Route::group(['middleware' => ['web']], function () {
        Route::get('tap/result', 'TapPaymentController@result')->name('tap.web.payment.result');
        Route::get('tap/error', 'TapPaymentController@error')->name('tap.web.payment.error');

        Route::get('tap/return', 'TapPaymentController@tapReturn')->name('tap.web.payment.return');
        Route::get('tap/post', 'TapPaymentController@tapPost')->name('tap.web.payment.post');
    });
});




