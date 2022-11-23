<?php

namespace Usama\Upayment\Controllers;

use App\Services\Traits\OrderTrait;

trait UpaymentTrait
{
    use OrderTrait;

    public function processPayment($order, $user)
    {
        try {
            $fields_string = http_build_query($this->createPaymentUrl($order, $user));
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, env('UPAYMENT_API_URL'));
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $server_output = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($server_output, true);

            if (isset($res['status']) && !empty($res['status']) && $res['status'] === 'success') {
                $parts = parse_url($res['paymentURL']);
                parse_str($parts['query'], $output);
                $referenceId = $output['ref'];
                $paymentUrl = $res['paymentURL'];
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
                return $paymentUrl;
            } else {
                throw new \Exception('Upayment : ' . $res['error_msg']);
            }
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function createPaymentUrl($order, $user, $access_token = '')
    {
        try {
            $post_string = [
                'merchant_id' => env('UPAYMENT_MERCHANT_ID'),
                'username' => env('UPAYMENT_USERNAME'),
                'password' => stripslashes(env('UPAYMENT_PASSWORD')),
                'api_key' => env('UPAYMENT_API_KEY'), // in sandbox request //'api_key' =>password_hash('API_KEY',PASSWORD_BCRYPT), //In production mode, please pass API_KEY with //BCRYPT function
                //'api_key' => password_hash(env('UPAYMENT_API_KEY'),
                'order_id' => $order->id, // MIN 30 characters with strong unique function (like hashing function with time)
                'total_price' => $order->net_price,
                'CurrencyCode' => env('UPAYMENT_CURRENCY_CODE'),
                'CstName' => $user->name,
                'CstEmail' => $user->email,
                'CstMobile' => str_limit($user->mobile, 10, ''),
                'success_url' => env('UPAYMENT_RETURN_URL'),
                'error_url' => env('UPAYMENT_ERROR_URL'),
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
                    'CurrencyCode' => env('UPAYMENT_CURRENCY_CODE'),
                ]);
            } else {
                array_push($productsList, [
                    "ProductName" => $orderMeta->service->name_en,
                    "Quantity" => $orderMeta->qty,
                    "UnitPrice" => $orderMeta->price,
                    'CurrencyCode' => env('UPAYMENT_CURRENCY_CODE'),
                ]);
            }
        }
        if ($order->shipment_fees > 0) {
            array_push($productsList, [
                'ProductName' => 'Shipment Fees',
                'Quantity' => 1,
                'UnitPrice' => $order->shipment_fees,
                'CurrencyCode' => env('UPAYMENT_CURRENCY_CODE'),
            ]);
        }
        if ($order->discount > 0) {
            array_push($productsList, [
                'ProductName' => 'Discount Coupon',
                'Quantity' => 1,
                'UnitPrice' => -($order->discount),
                'CurrencyCode' => env('UPAYMENT_CURRENCY_CODE'),
            ]);
        }
        return json_encode($productsList, JSON_UNESCAPED_SLASHES);
    }

    public function getInvoiceId($paymentId)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, ENV('UPAYMENT_API_URL_TOKEN'));
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query(array('grant_type' => 'password', 'username' => ENV('UPAYMENT_USERNAME'), 'password' => ENV('UPAYMENT_PASSWORD'))));
        $result = curl_exec($curl);
        $error = curl_error($curl);
        $info = curl_getinfo($curl);
        curl_close($curl);
        $json = json_decode($result, true);
        $access_token = $json['access_token'];
        $token_type = $json['token_type'];
        $url = ENV('UPAYMENT_API_URL_TRANSACTION') . $paymentId;
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
