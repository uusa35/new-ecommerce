<?php

namespace Usama\MyFatoorahV2;

require_once 'MyfatoorahApiV2.php';

use Exception;

/**
 *  PaymentMyfatoorahApiV2 handle the payment process of MyFatoorah API endpoints
 *
 * @author MyFatoorah <tech@myfatoorah.com>
 * @copyright 2021 MyFatoorah, All rights reserved
 * @license GNU General Public License v3.0
 */
class PaymentMyfatoorahApiV2
{
//    public $apiUrl;
//    public $apiKey;
//    public $endpointURL;
//
//    public function __construct($apiKey, $isTest, $loggerObj = null, $loggerFunc = null)
//    {
//        $this->apiUrl = config('myfatoorah.MYFATOOTRAH_API_URL');
//        $this->apiKey = config('myfatoorah.MYFATOOTRAH_API_KEY');
//        $this->endpointURL = config('myfatoorah.MYFATOOTRAH_END_POINT');
//    }

    /*
 * Call API Endpoint Function
 */

    function callAPI($endpointURL, $apiKey, $postFields = [], $requestType = 'POST')
    {

        $curl = curl_init($endpointURL);
        curl_setopt_array($curl, array(
            CURLOPT_CUSTOMREQUEST => $requestType,
            CURLOPT_POSTFIELDS => json_encode($postFields),
            CURLOPT_HTTPHEADER => array("Authorization: Bearer $apiKey", 'Content-Type: application/json'),
            CURLOPT_RETURNTRANSFER => true,
        ));

        $response = curl_exec($curl);
        $curlErr = curl_error($curl);

        curl_close($curl);

        if ($curlErr) {
            //Curl is not working in your server
            die("Curl Error: $curlErr");
        }

        $error = $this->handleError($response);
        if ($error) {
            die("Error: $error");
        }

        return json_decode($response);
    }

    /* ------------------------ Functions --------------------------------------- */
    /*
     * Initiate Payment Endpoint Function
     */

    function initiatePayment($apiURL, $apiKey, $postFields)
    {

        $json = $this->callAPI("$apiURL/v2/InitiatePayment", $apiKey, $postFields);
        return $json->Data->PaymentMethods;
    }

//------------------------------------------------------------------------------
    /*
     * Execute Payment Endpoint Function
     */

    function executePayment($apiURL, $apiKey, $postFields)
    {

        $json = $this->callAPI("$apiURL/v2/ExecutePayment", $apiKey, $postFields);
        return $json->Data;
    }

//------------------------------------------------------------------------------
    /*
     * Direct Payment Endpoint Function
     */

    function directPayment($paymentURL, $apiKey, $postFields)
    {

        $json = $this->callAPI($paymentURL, $apiKey, $postFields);
        return $json->Data;
    }

    /*
     * Handle Endpoint Errors Function
     */

    function handleError($response)
    {

        $json = json_decode($response);
        if (isset($json->IsSuccess) && $json->IsSuccess == true) {
            return null;
        }

        //Check for the errors
        if (isset($json->ValidationErrors) || isset($json->FieldsErrors)) {
            $errorsObj = isset($json->ValidationErrors) ? $json->ValidationErrors : $json->FieldsErrors;
            $blogDatas = array_column($errorsObj, 'Error', 'Name');

            $error = implode(', ', array_map(function ($k, $v) {
                return "$k: $v";
            }, array_keys($blogDatas), array_values($blogDatas)));
        } else if (isset($json->Data->ErrorMessage)) {
            $error = $json->Data->ErrorMessage;
        }

        if (empty($error)) {
            $error = (isset($json->Message)) ? $json->Message : (!empty($response) ? $response : 'API key or API URL is not correct');
        }

        return $error;
    }

    /* -------------------------------------------------------------------------- */

    /* ------------------------ Functions --------------------------------------- */
    /*
     * Send Payment Endpoint Function
     */

    function sendPayment($apiURL, $apiKey, $postFields) {

        $json = $this->callAPI("$apiURL/v2/SendPayment", $apiKey, $postFields);
        return $json->Data;
    }

    public function getInvoiceId($apiURL, $apiKey, $paymentId)
    {
        try {
            $postFields = [
                'Key'     => $paymentId,
                'KeyType' => 'paymentId'
            ];
            $json = $this->callAPI("$apiURL/v2/getPaymentStatus", $apiKey, $postFields);

//Display the payment result to your customer
            return $json->Data;

        } catch (\Exception $e) {
            return new \Exception('Not Found');
        }
    }
}
