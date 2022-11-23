<?php
/**
 * Created by PhpStorm.
 * User: usama
 * Date: 2019-03-11
 * Time: 14:00
 */

namespace App\Models;


use Carbon\Carbon;

trait ServiceHelpers
{
    public function scopeServeCountries($q)
    {
        return $q->whereHas('user', function ($q) {
            $q->where(['country_id' => getCurrentCountrySessionId()]);
        });

    }
}
