<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 6:04 PM
 */
Route::group(['namespace' => 'Usama\MyFatoorahV2\Controllers'], function () {
    Route::group(['middleware' => 'api'], function () {
        Route::post('api/myfatoorahv2/payment', 'MyFatoorahV2PaymentController@makePayment')->name('myfatoorahv2.api.payment.create');
    });

    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::post('myfatoorahv2/payment', 'MyFatoorahV2PaymentController@makePayment')->name('myfatoorahv2.web.payment.create');
    });
    Route::group(['middleware' => ['web']], function () {
        Route::get('myfatoorahv2/result', 'MyFatoorahV2PaymentController@result')->name('myfatoorahv2.web.payment.result');
        Route::get('myfatoorahv2/error', 'MyFatoorahV2PaymentController@error')->name('myfatoorahv2.web.payment.error');
    });
});





