<?php
namespace Usama\Tap\Contracts;
use Illuminate\Http\Request;

/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 7/17/17
 * Time: 11:00 AM
 */

interface TapContract {

    public function getGateWay();
    public function getMerchant();
    public function setHashString();
    public function getHashString();
    public function makePayment($customer,$cart);
}
