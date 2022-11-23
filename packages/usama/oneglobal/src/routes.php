<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/15/17
 * Time: 6:04 PM
 */
Route::group(['namespace' => 'Usama\OneGlobal\Controllers'], function () {
    Route::group(['middleware' => 'api'], function () {
        Route::post('api/oneglobal/payment', 'OneGlobalController@makePayment')->name('oneglobal.api.payment.create');
    });

    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::post('oneglobal/payment', 'OneGlobalController@makePayment')->name('oneglobal.web.payment.create');
    });
    Route::group(['middleware' => ['web']], function () {
        Route::get('oneglobal/result', 'OneGlobalController@result')->name('oneglobal.web.payment.result');
        Route::get('oneglobal/error', 'OneGlobalController@cancel')->name('oneglobal.web.payment.cancel');
    });
});





