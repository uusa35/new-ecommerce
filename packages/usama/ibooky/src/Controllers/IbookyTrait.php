<?php

namespace Usama\Ibooky\Controllers;

use App\Services\Traits\OrderTrait;

trait IbookyTrait
{
    use OrderTrait, PaypalHelpers;

    public function processPayment($order, $user)
    {
        try {

            $systemInfo = $this->systemInfo();
            $browser = $this->browser();
            $payerName = 'Payer Name';
            $payerPhone = 'Payer Phone';
            $mid = env('IBOOKEY_MERCHANT_ID');
            $txnRefNo = mt_rand(1000000000000000, 9999999999999999);
            $su = env('IBOOKY_RETURN_URL');
            $fu = env('IBOOKY_ERROR_URL');
            $amt = '10';
            $crossCat = "GEN";
            $secretKey = ENV('IBOOKEY_SECRET_KEY');
            $paymentoptions = $order->payment_method;
            $data = "$mid|$txnRefNo|$su|$fu|$amt|$crossCat|$secretKey|$txnRefNo";
            $order->update(['reference_id' => $txnRefNo]);
            $hashed = hash('sha512', $data);
            $paymentGatewayUrl = $this->getBookeeyPaymentGatewayUrl();
            $txnDtl = array(
                array(
//                    "SubMerchUID" => $order->order_metas()->first()->product()->first()->user()->first()->merchant_id,
                    "SubMerchUID" => env('IBOOKEY_MERCHANT_ID'),
                    "Txn_AMT" => $order->net_price
                )
            );

            $txnHdr = array(
                "PayFor" => "ECom",
                "Txn_HDR" => $order->id,
                "PayMethod" => $paymentoptions,
                "BKY_Txn_UID" => "",
                "Merch_Txn_UID" => $txnRefNo,
                "hashMac" => $hashed
            );

            $appInfo = array(
                "APPTyp" => "",
                "OS" => $browser,
                "DevcType" => 'device',
                "IPAddrs" => '12345',
                "Country" => "",
                "AppVer" => '123',
                "UsrSessID" => 'session Id',
                "APIVer" => 'whatever'
            );

            $pyrDtl = array(
                "Pyr_MPhone" => $payerPhone,
                "Pyr_Name" => $payerName
            );

            $merchDtl = array(
                "BKY_PRDENUM" => "ECom",
                "FURL" => $fu,
                "MerchUID" => $mid,
                "SURL" => $su
            );

            $moreDtl = array(
                "Cust_Data1" => "",
                "Cust_Data3" => "",
                "Cust_Data2" => ""
            );

            $postParams['Do_TxnDtl'] = $txnDtl;
            $postParams['Do_TxnHdr'] = $txnHdr;
            $postParams['Do_Appinfo'] = $appInfo;
            $postParams['Do_PyrDtl'] = $pyrDtl;
            $postParams['Do_MerchDtl'] = $merchDtl;
            $postParams['DBRqst'] = "PY_ECom";
            $postParams['Do_MoreDtl'] = $moreDtl;

            $ch = curl_init();

            $headers = array(
                'Accept: application/json',
                'Content-Type: application/json',
            );

//            var_dump($paymentGatewayUrl);
//            dd($postParams);
//            return($postParams);

            curl_setopt($ch, CURLOPT_URL, $paymentGatewayUrl);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postParams));
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $serverOutput = curl_exec($ch);
            $res = json_decode($serverOutput, true);
            curl_close($ch);

//            return($res);
//            dd($res);
            if (isset($res['PayUrl']) && !empty($res['ErrorMessage']) && $res['ErrorMessage'] === 'Success') {
//                $parts = parse_url($res['PayUrl']);
//                parse_str($parts['query'], $output);
                $paymentUrl = $res['PayUrl'];
                if (!empty($order->reference_id) && $order->order_metas->count() > 0) {
                    $order->update(['reference_id' => $txnRefNo]);
                } elseif ($order->order_metas->count() > 0) {
                    $newOrder = $order->replicate();
                    $newOrder->status = 'pending';
                    $newOrder->save();
                    foreach ($order->order_metas as $order_meta) {
                        $newOrderMeta = $order_meta->replicate();
                        $newOrderMeta->save();
                        $newOrderMeta->update(['order_id' => $newOrder->id]);
                    }
                    $newOrder->update(['reference_id' => $txnRefNo]);
                }
                return $paymentUrl;
            } else {
                throw new \Exception('Ibooky : ' . $res['ErrorMessage']);
            }
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function createPaymentUrl($order, $user, $access_token = '')
    {
        try {
            $post_string = [
                'merchant_id' => env('IBOOKY_MERCHANT_ID'),
                'username' => env('IBOOKY_USERNAME'),
                'password' => stripslashes(env('IBOOKY_PASSWORD')),
                'api_key' => env('IBOOKY_API_KEY'), // in sandbox request //'api_key' =>password_hash('API_KEY',PASSWORD_BCRYPT), //In production mode, please pass API_KEY with //BCRYPT function
                //'api_key' => password_hash(env('IBOOKY_API_KEY'),
                'order_id' => $order->id, // MIN 30 characters with strong unique function (like hashing function with time)
                'total_price' => $order->net_price,
                'CurrencyCode' => env('IBOOKY_CURRENCY_CODE'),
                'CstName' => $user->name,
                'CstEmail' => $user->email,
                'CstMobile' => str_limit($user->mobile, 10, ''),
                'success_url' => env('IBOOKY_RETURN_URL'),
                'error_url' => env('IBOOKY_ERROR_URL'),
                'test_mode' => env('APP_DEBUG'), // test mode enabled
                'whitelabled' => true, // only accept in live credentials (it will not work in test)
                'payment_gateway' => 'knet',// only works in production mode
                'ProductName' => $this->getProducts($order),
                'ProductQty' => json_encode([2, 1]),
                'ProductPrice' => json_encode([150, 1500]),
                'reference' => $order->id,
            ];
            return $post_string;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function getProducts($order)
    {
        $productsList = [];
        foreach ($order->order_metas as $orderMeta) {
            if ($orderMeta->isProductType) {
                array_push($productsList, [
                    "ProductName" => $orderMeta->product->name_en,
                    "Quantity" => $orderMeta->qty,
                    "UnitPrice" => $orderMeta->price,
                    'CurrencyCode' => env('IBOOKY_CURRENCY_CODE'),
                ]);
            } else {
                array_push($productsList, [
                    "ProductName" => $orderMeta->service->name_en,
                    "Quantity" => $orderMeta->qty,
                    "UnitPrice" => $orderMeta->price,
                    'CurrencyCode' => env('IBOOKY_CURRENCY_CODE'),
                ]);
            }
        }
        if ($order->shipment_fees > 0) {
            array_push($productsList, [
                'ProductName' => 'Shipment Fees',
                'Quantity' => 1,
                'UnitPrice' => $order->shipment_fees,
                'CurrencyCode' => env('IBOOKY_CURRENCY_CODE'),
            ]);
        }
        if ($order->discount > 0) {
            array_push($productsList, [
                'ProductName' => 'Discount Coupon',
                'Quantity' => 1,
                'UnitPrice' => -($order->discount),
                'CurrencyCode' => env('IBOOKY_CURRENCY_CODE'),
            ]);
        }
        return json_encode($productsList, JSON_UNESCAPED_SLASHES);
    }

    public function getInvoiceId($paymentId)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, ENV('IBOOKY_API_URL_TOKEN'));
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query(array('grant_type' => 'password', 'username' => ENV('IBOOKY_USERNAME'), 'password' => ENV('IBOOKY_PASSWORD'))));
        $result = curl_exec($curl);
        $error = curl_error($curl);
        $info = curl_getinfo($curl);
        curl_close($curl);
        $json = json_decode($result, true);
        $access_token = $json['access_token'];
        $token_type = $json['token_type'];
        $url = ENV('IBOOKY_API_URL_TRANSACTION') . $paymentId;
        $soap_do1 = curl_init();
        curl_setopt($soap_do1, CURLOPT_URL, $url);
        curl_setopt($soap_do1, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($soap_do1, CURLOPT_TIMEOUT, 10);
        curl_setopt($soap_do1, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($soap_do1, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($soap_do1, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($soap_do1, CURLOPT_POST, false);
        curl_setopt($soap_do1, CURLOPT_POST, 0);
        curl_setopt($soap_do1, CURLOPT_HTTPGET, 1);
        curl_setopt($soap_do1, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8', 'Accept: application/json', 'Authorization: Bearer ' . $access_token));
        $result_in = curl_exec($soap_do1);
        $err_in = curl_error($soap_do1);
        $file_contents = htmlspecialchars(curl_exec($soap_do1));
        curl_close($soap_do1);
        $getRecorById = json_decode($result_in, true);
        return $getRecorById['InvoiceId'];
    }

    public function clearCart()
    {
        session()->forget('cart');
    }
}
