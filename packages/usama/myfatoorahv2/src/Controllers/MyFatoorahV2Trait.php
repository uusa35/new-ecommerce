<?php

namespace Usama\MyFatoorahV2\Controllers;

use App\Services\Traits\OrderTrait;

trait MyFatoorahV2Trait
{
    use OrderTrait;
    public function processPayment($order, $user)
    {
        try {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, ENV('MYFATOORAH_API_URL_TOKEN'));
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query(array('grant_type' => 'password', 'username' => ENV('MYFATOORAH_USERNAME'), 'password' => ENV('MYFATOORAH_PASSWORD'))));
            $result = curl_exec($curl);
            $info = curl_getinfo($curl);
            curl_close($curl);
            $json = json_decode($result, true);
            if (isset($json['access_token']) && !empty($json['access_token'])) {
                $access_token = $json['access_token'];
            } else {
                $access_token = '';
            }
            if (isset($json['token_type']) && !empty($json['token_type'])) {
                $token_type = $json['token_type'];
            } else {
                $token_type = '';
            }
            if (isset($json['access_token']) && !empty($json['access_token'])) {
                $elements = $this->createPaymentUrl($order, $user, $access_token);
                $referenceId = $elements[0];
                $paymentUrl = $elements[1];
                if (!empty($referenceId) && strlen($referenceId) > 3) {
                    if (empty($order->reference_id) && $order->order_metas->count() > 0) {
                        $order->update(['reference_id' => $referenceId]);
                    } elseif ($order->order_metas->count() > 0) {
                        $newOrder = $order->replicate();
                        $newOrder->status = 'pending';
                        $newOrder->save();
                        foreach ($order->order_metas as $order_meta) {
                            $newOrderMeta = $order_meta->replicate();
                            $newOrderMeta->save();
                            $newOrderMeta->update(['order_id' => $newOrder->id]);
                        }
                        $newOrder->update(['reference_id' => $referenceId]);
                    }
                }
                return $paymentUrl;
            } else {
                //print_r($json);
                print_r("Error: " . $json['error'] . "<br>Description: " . $json['error_description']);
            }
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function createPaymentUrl($order, $user, $access_token)
    {
        try {
            $post_string = '{
            "InvoiceValue": "' . $order->net_price . '",
            "CustomerName": "' . $user->name . '",
            "CustomerBlock": "' . str_limit($user->address, 10, '') . '",
            "CustomerStreet": "' . str_limit($user->address,45) . '",
            "CustomerHouseBuildingNo": "' . str_limit($user->address,45) . '",
            "CustomerCivilId": "",
            "CustomerAddress": "' . $user->address . '",
            "CustomerReference": "' . $user->id . '",
            "DisplayCurrencyIsoAlpha": "' . ENV('MYFATOORAH_CURRENCY_CODE') . '",
            "CountryCodeId": "+965",
            "CustomerMobile": "' . str_limit($user->mobile, 10, '') . '",
            "CustomerEmail": "' . $user->email . '",
            "DisplayCurrencyId": 3,
            "SendInvoiceOption": 1,
            "InvoiceItemsCreate": ' . $this->getProducts($order) . ',
           "CallBackUrl":  "' . env('MYFATOORAH_RETURN_URL') . '",
            "Language": 2,
             "ExpireDate": "2022-12-31T13:30:17.812Z",
              "ApiCustomFileds": "weight=10,size=L,lenght=170",
              "ErrorUrl": "' . env('MYFATOORAH_ERROR_URL') . '"
          }';
            $soap_do = curl_init();
            curl_setopt($soap_do, CURLOPT_URL, env('MYFATOORAH_API_CREATE_INVOICE'));
            curl_setopt($soap_do, CURLOPT_CONNECTTIMEOUT, 10);
            curl_setopt($soap_do, CURLOPT_TIMEOUT, 10);
            curl_setopt($soap_do, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($soap_do, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($soap_do, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($soap_do, CURLOPT_POST, true);
            curl_setopt($soap_do, CURLOPT_POSTFIELDS, $post_string);
            curl_setopt($soap_do, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8', 'Content-Length: ' . strlen($post_string), 'Accept: application/json', 'Authorization: Bearer ' . $access_token));
            $result1 = curl_exec($soap_do);
            $err = curl_error($soap_do);
            $json1 = json_decode($result1, true);
            $RedirectUrl = $json1['RedirectUrl'];
            $ref_Ex = explode('/', $RedirectUrl);
            $referenceId = $json1['Id'];
            curl_close($soap_do);
            return [$referenceId, $RedirectUrl];
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function getProducts($order)
    {
        $productsList = [];
        foreach ($order->order_metas as $orderMeta) {
            if($orderMeta->isProductType) {
                array_push($productsList, [
                    "ProductName" => $orderMeta->product->name_en,
                    "Quantity" => $orderMeta->qty,
                    "UnitPrice" => $orderMeta->price,
                    'CurrencyCode' => env('MYFATOORAH_CURRENCY_CODE'),
                ]);
            } else {
                array_push($productsList, [
                    "ProductName" => $orderMeta->service->name_en,
                    "Quantity" => $orderMeta->qty,
                    "UnitPrice" => $orderMeta->price,
                    'CurrencyCode' => env('MYFATOORAH_CURRENCY_CODE'),
                ]);
            }
        }
        if ($order->shipment_fees > 0) {
            array_push($productsList, [
                'ProductName' => 'Shipment Fees',
                'Quantity' => 1,
                'UnitPrice' => $order->shipment_fees,
                'CurrencyCode' => env('MYFATOORAH_CURRENCY_CODE'),
            ]);
        }
        if ($order->discount > 0) {
            array_push($productsList, [
                'ProductName' => 'Discount Coupon',
                'Quantity' => 1,
                'UnitPrice' => -($order->discount),
                'CurrencyCode' => env('MYFATOORAH_CURRENCY_CODE'),
            ]);
        }
        return json_encode($productsList, JSON_UNESCAPED_SLASHES);
    }



    public function clearCart()
    {
        session()->forget('cart');
    }
}
