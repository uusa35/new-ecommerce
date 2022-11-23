<?php

namespace Usama\Ibooky\Controllers;

/**
 * @package Bookeey Payment Gateway Library
 * @version 2.0.0
 * @author Writerz Wall
 * @link https://writerzwall.com
 *
 * This is the core library class for the implementation of
 * Bookeey Payment Gateway in PHP.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3.0
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details at
 * https://www.gnu.org/licenses/lgpl-3.0.html
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. Please check the license for more details.
 *
 */

const APP_VERSION = "2.0.0";
const API_VERSION = "2.0.0";

///////////////////////////////////////
//Payment Option Codes. DO NOT CHANGE//
///////////////////////////////////////

const KNET_CODE = "knet";
const CREDIT_CODE = "credit";
const BOOKEEY_CODE = "Bookeey";
const AMEX_CODE = "amex";


///////////////////////////////////////////////////////////
//Payment Option Titles. Merchant may change these titles//
///////////////////////////////////////////////////////////

const KNET_TITLE = "KNET";
const CREDIT_TITLE = "Credit Card";
const BOOKEEY_TITLE = "Bookeey PG";
const AMEX_TITLE = "AMEX";


/////////////////////////////////////////////
//Bookeey Payment Gateway Merchant Settings//
/////////////////////////////////////////////


/**
 * Default Payment Option
 * Type: Constant Variable | String
 * Possible Values: Enter the payment option code or the corresponding constant variable which will be used as default payment option.
 */
const DEFAULT_PAYMENT_OPTION = BOOKEEY_CODE;

/**
 * Enable/Disable Payment Method
 * Type: Integer
 * Possible Values: 0 (Disable) | 1 (Enable)
 */
const IS_ENABLE = 1;

/**
 * Enable/Disable Test Mode
 * Type: Integer
 * Possible Values:  0 (Enable Live Mode) | 1 (Enable Test Mode)
 */
const IS_TEST_MODE_ENABLE = 0;

/**
 * Payment Method Title
 * Type: String
 * Possible Values: Any string type values possible
 */
const TITLE = "Bookeey Payment";

/**
 * Payment Method Description
 * Type: String
 * Possible Values: Any string type values possible
 */
const DESCRIPTION = "Pay with Bookeey payment";

/**
 * Merchant ID
 * Type: String
 * Possible Values: Enter the Merchant Id provided by Bookeey.
 */
const MERCHANT_ID = "mer2100049";

/**
 * Secret Key
 * Type: String
 * Possible Values: Enter the Secret Key provided by Bookeey.
 */
const SECRET_KEY = "2161947";


/////////////////////////////////////////
//Bookeey Payment Gateway Configuration//
/////////////////////////////////////////

/**
 * Success URL
 * Type: String
 * Possible Values: Enter the Success Page URL as per your project.
 */
const SUCCESS_URL = "https://localhost:9090/bookeey_library/success.php";

/**
 * Failure URL
 * Type: String
 * Possible Values: Enter the Failure Page URL as per your project.
 */
const FAILURE_URL = "https://localhost:9090/bookeey_library/failure.php";

/**
 * Test Bookeey Payment Gateway URL
 * Type: String
 * CRITICAL: DO NOT CHANGE THIS VALUE.
 */
const TEST_BOOKEEY_PAYMENT_GATEWAY_URL = "https://apps.bookeey.com/pgapi/api/payment/requestLink";

/**
 * Live Bookeey Payment Gateway URL
 * Type: String
 * CRITICAL: DO NOT CHANGE THIS VALUE.
 */
const LIVE_BOOKEEY_PAYMENT_GATEWAY_URL = "https://pg.bookeey.com/internalapi/api/payment/requestLink";

/**
 * Test Bookeey Payment Requery URL
 * Type: String
 * CRITICAL: DO NOT CHANGE THIS VALUE.
 */
const TEST_BOOKEEY_PAYMENT_REQUERY_URL = "https://apps.bookeey.com/pgapi/api/payment/paymentstatus";

/**
 * Live Bookeey Payment Requery URL
 * Type: String
 * CRITICAL: DO NOT CHANGE THIS VALUE.
 */
const LIVE_BOOKEEY_PAYMENT_REQUERY_URL = "https://pg.bookeey.com/internalapi/api/payment/paymentstatus";

/**
 * Payment Options
 * Type: Array
 * CRITICAL: DO NOT CHANGE THESE VALUES
 */
const PAYMENT_OPTIONS = array(
    array(
        'is_active' => 1,
        'title' => KNET_TITLE,
        'code' => KNET_CODE
    ),
    array(
        'is_active' => 1,
        'title' => CREDIT_TITLE,
        'code' => CREDIT_CODE
    ),
    array(
        'is_active' => 1,
        'title' => BOOKEEY_TITLE,
        'code' => BOOKEEY_CODE
    ),
    array(
        'is_active' => 1,
        'title' => AMEX_TITLE,
        'code' => AMEX_CODE
    )
);

trait IbookyHelpers
{
    /**
     * Get the Enable/Disable Status of the Payment Method
     * Return Type: Integer
     * Possible Values: 0 (Disable) | 1 (Enable)
     */
    function isEnable() {
        return IS_ENABLE;
    }

    /**
     * Set the Enable/Disable Status of the Payment Method
     * Argument Type: Integer
     * Possible Values: 0 (Disable) | 1 (Enable)
     */
    function setIsEnable($data) {
        return $data;
    }

    /**
     * Get the Enable/Disable status of the Test Mode
     * Return Type: Integer
     * Possible Values:  0 (Enable Live Mode) | 1 (Enable Test Mode)
     */
    function isTestModeEnable() {
        return IS_TEST_MODE_ENABLE;
    }

    /**
     * Set the Enable/Disable status of the Test Mode
     * Argument Type: Integer
     * Possible Values:  0 (Enable Live Mode) | 1 (Enable Test Mode)
     */
    function setIsTestModeEnable($data) {
        return $data;
    }

    /**
     * Get the Payment Method Title
     * Return Type: String
     * Possible Values: Any string type values possible
     */
    function getTitle() {
        return TITLE;
    }

    /**
     * Set the Payment Method Title
     * Argument Type: String
     * Possible Values: Any string type values possible
     */
    function setTitle($data) {
        return $data;
    }


    /**
     * Get the Payment Method Description
     * Return Type: String
     * Possible Values: Any string type values possible
     */
    function getDescription() {
        return DESCRIPTION;
    }



    /**
     * Get Merchant ID
     * Return Type: String
     */
    function getMerchantID() {
        return MERCHANT_ID;
    }

    /**
     * Set Merchant ID
     * Argument Type: String
     * Possible Values: Enter the Merchant Id provided by Bookeey.
     */
    function setMerchantID($data) {
        return MERCHANT_ID;
    }


    /**
     * Get Secret Key
     * Return Type: String
     */
    function getSecretKey() {
        return $this->secretKey;
    }

    /**
     * Set Secret Key
     * Argument Type: String
     * Possible Values: Enter the Secret Key provided by Bookeey.
     */
    function setSecretKey($data) {
        return SECRET_KEY;
    }


    /**
     * Get Success URL
     * Return Type: String
     */
    function getSuccessUrl() {
        return SUCCESS_URL;
    }

    /**
     * Set Success URL
     * Argument Type: String
     * Possible Values: Enter the Success Page URL as per your project.
     */
    function setSuccessUrl($data) {
        return SUCCESS_URL;
    }


    /**
     * Get Failure URL
     * Return Type: String
     */
    function getFailureUrl() {
        return FAILURE_URL;
    }

    /**
     * Set Failure URL
     * Argument Type: String
     * Possible Values: Enter the Failure Page URL as per your project.
     */
    function setFailureUrl($data) {
        return FAILURE_URL;
    }


    /**
     * Get Amount
     * Return Type: Integer | Float
     */
    function getAmount() {
        return $this->amount;
    }

    /**
     * Set Amount
     * Argument Type: Integer | Float
     * Possible values: Enter any Integer or Float type number
     */
    function setAmount($data) {
        $this->amount = $data;
    }


    /**
     * Get Order Id
     * Type: Integer | String
     * Note: Order ID should be unique for each transaction.
     */
    function getOrderId() {
        return $this->orderId;
    }

    /**
     * Set Order Id
     * Type: Integer | String
     * Note: Order ID should be unique for each transaction.
     */
    function setOrderId($data) {
        $this->orderId = $data;
    }


    /**
     * Get Payer Name
     * Type: String
     */
    function getPayerName() {
        return $this->payerName;
    }

    /**
     * Set Payer Name
     * Type: String
     */
    function setPayerName($data) {
        $this->payerName = $data;
    }


    /**
     * Get Payer Phone
     * Type: String
     */
    function getPayerPhone() {
        return $this->payerPhone;
    }

    /**
     * Set Payer Phone
     * Type: String
     */
    function setPayerPhone($data) {
        $this->payerPhone = $data;
    }


    /**
     * Get Default Payment Option
     * Return Type: String
     */
    function getDefaultPaymentOption() {
        return $this->defaultPaymentOption;
    }

    /**
     * Set Default Payment Option
     * Argument Type: Constant Variable | String
     * Possible Values: Enter the payment option code or the corresponding constant variable which will be used as default payment option.
     */
    function setDefaultPaymentOption($data) {
        $this->defaultPaymentOption = $data;
    }

    /**
     * Get Selected Payment Option
     * Return Type: String
     */
    function getSelectedPaymentOption() {
        return $this->selectedPaymentOption;
    }

    /**
     * Set Selected Payment Option
     * Argument Type: Constant Variable | String
     * Possible Values: Enter the payment option code or the corresponding constant variable which will be used as selected payment option.
     */
    function setSelectedPaymentOption($data) {
        $this->selectedPaymentOption = $data;
    }


    /**
     * Get Test Bookeey Payment Gateway URL
     * Return Type: String
     */
    function getTestBookeeyPaymentGatewayUrl(){
        return TEST_BOOKEEY_PAYMENT_GATEWAY_URL;
    }

    /**
     * Get Live Bookeey Payment Gateway URL
     * Return Type: String
     */
    function getLiveBookeeyPaymentGatewayUrl() {
        return LIVE_BOOKEEY_PAYMENT_GATEWAY_URL;
    }


    /**
     * Get Test Bookeey Payment Requery URL
     * Return Type: String
     */
    function getTestBookeeyPaymentRequeryUrl(){
        return TEST_BOOKEEY_PAYMENT_REQUERY_URL;
    }

    /**
     * Get Live Bookeey Payment Requery URL
     * Return Type: String
     */
    function getLiveBookeeyPaymentRequeryUrl() {
        return LIVE_BOOKEEY_PAYMENT_REQUERY_URL;
    }


    /**
     * Get All Payment Options
     * Return Type: Array
     */
    function getPaymentOptions() {
        return $this->paymentOptions;
    }

    /**
     * Get Active Payment Options
     * Return Type: Array
     */
    function getActivePaymentOptions() {
        $paymentOptions = $this->getPaymentOptions();
        $activePaymentOptions = array_filter($paymentOptions, function ($var) {
            return ($var['is_active'] == 1);
        });

        return $activePaymentOptions;
    }

    /**
     * Get Bookeey Payment Gateway URL as per Active Mode
     * Type: String
     */
    function getBookeeyPaymentGatewayUrl() {
        $isTestModeEnable = $this->isTestModeEnable();

        if($isTestModeEnable) {
            $bookeeyPaymentGatewayUrl = $this->getTestBookeeyPaymentGatewayUrl();
        }else{
            $bookeeyPaymentGatewayUrl = $this->getLiveBookeeyPaymentGatewayUrl();
        }

        return $bookeeyPaymentGatewayUrl;
    }

    /**
     * Get Bookeey Payment Requery URL as per Active Mode
     * Type: String
     */
    function getBookeeyPaymentRequeryUrl() {
        $isTestModeEnable = $this->isTestModeEnable();

        if($isTestModeEnable) {
            $bookeeyPaymentRequeryUrl = $this->getTestBookeeyPaymentRequeryUrl();
        }else{
            $bookeeyPaymentRequeryUrl = $this->getLiveBookeeyPaymentRequeryUrl();
        }

        return $bookeeyPaymentRequeryUrl;
    }

    /**
     * Get System information
     */
    function systemInfo()
    {
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $os_platform    = "Unknown OS Platform";
        $os_array       = array(
            '/windows nt 10.0/i'    =>  'Windows 10',
            '/windows phone 8/i'    =>  'Windows Phone 8',
            '/windows phone os 7/i' =>  'Windows Phone 7',
            '/windows nt 6.3/i'     =>  'Windows 8.1',
            '/windows nt 6.2/i'     =>  'Windows 8',
            '/windows nt 6.1/i'     =>  'Windows 7',
            '/windows nt 6.0/i'     =>  'Windows Vista',
            '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
            '/windows nt 5.1/i'     =>  'Windows XP',
            '/windows xp/i'         =>  'Windows XP',
            '/windows nt 5.0/i'     =>  'Windows 2000',
            '/windows me/i'         =>  'Windows ME',
            '/win98/i'              =>  'Windows 98',
            '/win95/i'              =>  'Windows 95',
            '/win16/i'              =>  'Windows 3.11',
            '/macintosh|mac os x/i' =>  'Mac OS X',
            '/mac_powerpc/i'        =>  'Mac OS 9',
            '/linux/i'              =>  'Linux',
            '/ubuntu/i'             =>  'Ubuntu',
            '/iphone/i'             =>  'iPhone',
            '/ipod/i'               =>  'iPod',
            '/ipad/i'               =>  'iPad',
            '/android/i'            =>  'Android',
            '/blackberry/i'         =>  'BlackBerry',
            '/webos/i'              =>  'Mobile'
        );

        $found = false;
        $device = '';

        foreach ($os_array as $regex => $value)
        {
            if($found)
                break;
            else if (preg_match($regex, $user_agent))
            {
                $os_platform = $value;
                $device = !preg_match('/(windows|mac|linux|ubuntu)/i',$os_platform)
                    ?'MOBILE':(preg_match('/phone/i', $os_platform)?'MOBILE':'SYSTEM');
            }
        }
        $device = !$device? 'SYSTEM':$device;

        return array('os'=>$os_platform,'device'=>$device);
    }


    /**
     * Get Browser information
     */
    function browser()
    {
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $browser        =   "Unknown Browser";
        $browser_array  = array(
            '/msie/i'       =>  'Internet Explorer',
            '/firefox/i'    =>  'Mozilla Firefox',
            '/safari/i'     =>  'Safari',
            '/chrome/i'     =>  'Google Chrome',
            '/edge/i'       =>  'Microsoft Edge',
            '/opera/i'      =>  'Opera',
            '/netscape/i'   =>  'Netscape',
            '/maxthon/i'    =>  'Maxthon',
            '/konqueror/i'  =>  'Konqueror',
            '/mobile/i'     =>  'Handheld Browser'
        );

        $found = false;

        foreach ($browser_array as $regex => $value)
        {
            if($found)
                break;
            else if (preg_match($regex, $user_agent,$result))
            {
                $browser = $value;
            }
        }

        return $browser;
    }

    /**
     * Get Updated Transaction Status from Bookeey Payment Requery Url
     * Argument: String (Pass the Transaction Id for which you want to get the updated status)
     */
    function getPaymentStatus($orderIds){
        $requeryUrl = $this->getBookeeyPaymentRequeryUrl();

        $mid = MERCHANT_ID;
        $rndnum = rand(10000,99999);
        $secretKey = SECRET_KEY;

        $data = "$mid|$secretKey|$rndnum";
        $hashed = hash('sha512', $data);

        $postParams['Mid'] = $mid;
        $postParams['MerchantTxnRefNo'] = [$orderIds];
        $postParams['HashMac'] = $hashed;

        $ch = curl_init();
        $headers = array(
            'Accept: application/json',
            'Content-Type: application/json',
        );

        curl_setopt($ch, CURLOPT_URL,$requeryUrl);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postParams));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $serverOutput = curl_exec($ch);
        $decodeOutput = json_decode($serverOutput, true);
        curl_close ($ch);

        return $decodeOutput['PaymentStatus'];
    }

}
