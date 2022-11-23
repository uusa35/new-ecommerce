<?php

namespace App\Services\Traits;

use App\Jobs\sendSuccessOrderEmail;
use App\Mail\OrderPaid;
use App\Models\Country;
use App\Models\Order;
use App\Models\OrderMeta;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Timing;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Mail;
use function PHPUnit\Framework\isNull;

trait OrderTrait
{
    public function createOrder(Request $request)
    {
//        try {
            $request->validate([
                'cart.cartId' => 'required',
                'cart.total' => 'required|numeric',
                'cart.netTotal' => 'required|numeric',
                'cart.directPurchaseMode' => 'required|boolean',
                'cart.multiCartMerchant' => 'required|boolean',
                'cart.merchants' => 'array|required',
                'cart.shipmentCountry' => 'array',
                'cart.shipmentGovernate' => 'array',
                'cart.receiveFromShop' => 'required|boolean',
                'cart.totalWeight' => 'required|numeric',
                'cart.items' => 'array|required',
                'cart.items.*.cart_id' => 'required|numeric',
                'cart.items.*.element_id' => 'required|numeric',
                'cart.items.*.direct_purchase' => 'boolean',
                'cart.items.*.type' => 'required|string',
                'cart.items.*.qty' => 'required|numeric',
                'cart.items.*.price' => 'required|numeric',
//                'cart.items.*.shipmentFees' => 'numeric',
                'cart.items.*.name_ar' => 'required',
                'cart.items.*.name_en' => 'required',
                'cart.items.*.merchant_name_ar' => 'required',
                'cart.items.*.merchant_name_en' => 'required',
//                'cart.items.*.merchant_enable_receive_from_shop' => 'required',
            ]);

            $auth = User::whereId(auth()->id())->with('country', 'area')->first();
            $order = Order::updateOrCreate(['reference_id' => $request->cart['cartId']], [
                'price' => $request->cart['total'],
                'net_price' => $request->cart['netTotal'],
                'discount' => $request->cart['discount'],
                'shipment_fees' => $request->cart['shipmentFees'],
                'receive_on_branch' => $request->cart['receiveFromShop'],
                'notes' => $request->cart['notes'] ? $request->cart['notes'] : '',
                'country_id' => $request->cart['shipmentCountry']['id'],
                'country' => $request->cart['shipmentCountry']['name_en'],
                'governate_id' => $request->cart['shipmentGovernate']['id'],
                'area' => $request->cart['shipmentGovernate']['name_en'],
                'block' => $auth->block,
                'street' => $auth->street,
                'building' => $auth->building,
                'apartment' => $auth->apartment,
                'floor' => $auth->floor,
                'mobile' => $auth->mobile,
                'email' => $auth->email,
                'user_id' => $auth->id,
            ]);
//            http://ecommerce-backend.test/tap/return?tap_id=chg_TS040120222149k4K52803336
            $order->order_metas()->delete();
            foreach ($request->cart['items'] as $item) {
                // i commented this due to product_attribute duplication because was element_id unique to add more than product attributes in one order
//                OrderMeta::updateOrCreate(['order_id' => $order->id, 'ordermetable_type' => 'App\Models\\' . ucfirst($item['type']), 'ordermetable_id' => $item['element_id']], [
                $timing = isset($item['timing_id']) ? Timing::whereId($item['timing_id'])->first() : null;
                OrderMeta::updateOrCreate([
                    'order_id' => $order->id,
                    'name' => $item['name_ar'] . '   /  ' . $item['name_en'],
                    'description' => $item['description_ar'] . '   /  ' . $item['description_en'],
                    'price' => $item['price'],
                    'qty' => $item['qty'],
                    'notes' => isset($item['notes']) ? $item['notes'] : null,
//                    'color' => isset($item['color']) ? $item['color'] : null,
//                    'size' => isset($item['size']) ? $item['size'] : null,
                    'merchant_id' => isset($item['merchant_id']) ? $item['merchant_id'] : null,
                    'timing_id' => isset($item['timing_id']) ? $item['timing_id'] : null,
                    'booked_at' => $timing ? Carbon::parse($timing->date .' '. $timing->time) : null,
                    'time' => $timing ? Carbon::parse($timing->start)->format('h:i:s') : null,
                    'ordermetable_id' => $item['element_id'],
                    'ordermetable_type' => 'App\Models\\' . ucfirst($item['type']),
                    'attribute_id' => isset($item['attribute_id']) ? $item['attribute_id'] : null,

                ]);
            }
            return $order;
//        } catch (\Exception $exception) {
//            dd($exception->getMessage());
//        }
    }


    public function orderSuccessAction($reference_id)
    {
        try {
            $order = Order::where(['reference_id' => $reference_id, 'paid' => false])->with('user', 'order_metas.ordermetable', 'order_metas.product_attribute')->first();
            if ($order) {
                $order->update([
                    'paid' => true,
                    'status' => 'paid'
                ]);
                $settings = Setting::first();
                if ($settings->enable_products) {
                    $this->decreaseQty($order);
                }
                if(env('MAIL_ENABLED')) {
                    Mail::to($settings->email)->cc([$order->user->email, $order->order_metas->first()->ordermetable->user->email])->send(new OrderPaid($order));
                }
                $markdown = new Markdown(view(), config('mail.markdown'));
                return $markdown->render('emails.orders.paid', ['order' => $order]);
            }
            abort(404, 'Order does not exist');
        } catch (\Exception $e) {
            return abort(404, $e->getMessage());
        }
    }

    public function createWebOrder(Request $request, User $user)
    {
        $validate = validator($request->all(), [
            'country_id' => 'required|exists:countries,id',
            'collection_id' => 'exists:collections,id',
            'payment_method' => 'required|min:3',
'receiveFromShop' => 'required|boolean'
//            'branch_id' => 'required_if:receive_on_branch,1|exists:branches,id'
//            'shipment_fees' => 'required|numeric'
        ]);
        if ($validate->fails()) {
            return redirect()->route('frontend.cart.index')->withErrors($validate);
        }
        $coupon = session()->has('coupon') ? session('coupon') : false;
        $country = Country::whereId($request->country_id)->first();
        $order = Order::create([
            'price' => (float)$this->getTotalPriceOfProductsOnly($this->cart),
            'net_price' => (float)getCartNetTotal(),
            'mobile' => $request->mobile,
            'country' => $country->name,
            'area' => $request->area ? $request->area : null,
            'email' => $request->email,
            'address' => $request->address,
            'notes' => $request->notes,
            'user_id' => $user->id,
            'cash_on_delivery' => $request->has('cash_on_delivery') ? $request->cash_on_delivery : false,
            'discount' => (float)$coupon ? ($coupon->is_percentage ? ($this->cart->subTotal() * ($coupon->value / 100)) : $coupon->value) : 0,
            'coupon_id' => $coupon ? $coupon['id'] : null,
            'payment_method' => $request->payment_method,
            'shipment_fees' => (float)$this->cart->content()->where('options.type', 'country')->first()->total(),
            'receive_on_branch' => $request->has('receive') ? $request->receive_on_branch : 0
        ]);
        $request->has('branch_id') && !is_null($request->branch_id) ? $order->update(['branch_id' => $request->branch_id]) : null;
        if ($order) {
            $this->cart->content()->each(function ($element) use ($order, $user) {
                if ($element->options->type === 'product' || $element->options->type === 'service') {
                    $order->order_metas()->create([
                        'order_id' => $order->id,
                        'product_id' => $element->options->type === 'product' ? $element->options->element_id : null,
                        'service_id' => $element->options->type === 'service' ? $element->options->element_id : null,
                        'product_attribute_id' => $element->options->product_attribute_id,
                        'collection_id' => $element->options->collection_id ? $element->options->collection_id : null,
                        'item_name' => $element->options->element->name,
                        'item_type' => $element->options->type,
                        'qty' => $element->qty,
                        'price' => (float)$element->price,
                        'notes' => $element->options->notes ? $element->options->notes : null,
                        'product_size' => $element->options->size ? $element->options->size->name : null,
                        'product_color' => $element->options->color ? $element->options->color->name : null,
                        'service_date' => $element->options->day_selected,
                        'service_time' => $element->options->timing ? $element->options->timing->start : null,
                        'timing_id' => $element->options->timing_id,
                        'destination_id' => $user->country_id,
                    ]);
                }
            });
            return $order;
        }
        return false;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function createUser(Request $request)
    {
        $validate = validator($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'mobile' => 'required|numeric|min:8',
            'address' => 'required|min:2',
            'country_id' => 'required|exists:countries,id',
        ]);
        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate);
        }
        if (auth()->check()) {
            $user = auth()->user();
            $user->update([
                'name' => $request->name,
                'password' => bcrypt($request->mobile),
                'country_id' => $request->country_id,
                'mobile' => $request->mobile,
                'address' => $request->address,
                'role_id' => $user->role_id ? $user->role_id : Role::where('is_client', true)->first()->id
            ]);
        } else {
            $user = User::where('email', $request->email)->orWhere(['mobile' => $request->mobile])->first();
            if ($user) {
                $user->update([
                    'name' => $request->name,
                    'password' => bcrypt($request->mobile),
                    'country_id' => $request->country_id,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                ]);
            } else {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => bcrypt($request->mobile),
                    'country_id' => $request->country_id,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                    'role_id' => Role::where('is_client', true)->first()->id
                ]);
            }

        }
        return $user;
    }

    public function checkCart(Request $request)
    {
        try {
            $validate = validator($request->all(), [
                'order_id' => 'numeric|exists:orders,id',
                'name' => 'required|min:3|max:200',
                'email' => 'required|email',
                'mobile' => 'required:min:6',
                'address' => 'required|min:5',
                'country_id' => 'required|exists:countries,id',
                'collection_id' => 'numeric|exists:collections,id',
                'cart' => 'required|array',
                'coupon_id' => 'nullable|exists:coupons,id',
                'price' => 'required',
                'net_price' => 'required',
                'shipment_fees' => 'required',
                'discount' => 'required',
                'payment_method' => 'required|min:3',
                'shipment_fees' => 'required|numeric',
                'cash_on_delivery' => 'required|boolean',
            ]);
            if ($validate->fails()) {
                return $validate->errors()->first();
            }
            if ($request->has('order_id')) {
                $className = env('ORDER_MODEL_PATH');
                $order = new $className();
                $order = $order->whereId($request->order_id)->with('order_metas.product', 'order_metas.product_attribute')->first();
                if ($order) {
                    return $order;
                }
            }
            $user = User::where(['email' => $request->email])->orWhere(['mobile' => $request->mobile])->first();
            if ($user) {
                $user->update([
                    'name' => $request->name,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                    'area' => $request->area,
                    'block' => $request->block,
                    'street' => $request->street,
                    'building' => $request->building,
                    'apartment' => $request->apartment,
                    'country_id' => $request->country_id,
                ]);
            } else {
                $user = User::create([
                    'email' => $request->email,
                    'name' => $request->name,
                    'mobile' => $request->mobile,
                    'address' => $request->address,
                    'area' => $request->area,
                    'block' => $request->block,
                    'street' => $request->street,
                    'building' => $request->building,
                    'apartment' => $request->apartment,
                    'country_id' => $request->country_id,
                    'password' => bcrypt($request->mobile),
                    'role_id' => Role::where('is_client', true)->first()->id
                ]);

            }
            return $order = $this->createApiOrder($request, $user);
            return new \Exception('User is not created successfully');
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function createApiOrder(Request $request, $user)
    {
        try {
            if (!$user->country->is_local) {
                foreach ($request->cart as $item) {
                    if ($item['type'] === 'service') {
                        return trans('message.services_are_only_allowed_locally_your_order_is_not_complete');
                    }
                }
            }
            $order = Order::create([
                'price' => (float)$request->price,
                'net_price' => (float)$request->net_price,
                'mobile' => $request->mobile,
                'country' => $user->country->name,
                'area' => $request->has('area') ? $request->area : 'N/A',
                'block' => $request->block,
                'street' => $request->street,
                'building' => $request->building,
                'apartment' => $request->apartment,
                'email' => $request->email,
                'address' => $request->address,
                'notes' => $request->notes,
                'user_id' => $user->id,
                'discount' => $request->discount,
                'shipment_fees' => (float)$request->shipment_fees,
                'coupon_id' => $request->has('coupon_id') ? $request->coupon_id : null,
                'payment_method' => $request->payment_method,
                'cash_on_delivery' => $request->cash_on_delivery,
            ]);
            if ($order) {
                $settings = Setting::first();
                foreach ($request->cart as $item) {
                    if ($item['type'] === 'product') {
                        $product = Product::whereId($item['product_id'])->first();
                        $productAttribute = $product->hasRealAttributes ? ProductAttribute::whereId($item['product_attribute_id'])->with('size', 'color')->first() : null;
                        $order->order_metas()->create([
                            'order_id' => $order->id,
                            'product_id' => $item['product_id'],
                            'product_attribute_id' => $product->hasRealAttributes ? $item['product_attribute_id'] : null,
                            'collection_id' => $request->collection_id,
                            'qty' => $item['qty'],
                            'price' => $item['wrapGift'] ? (float)$item['element']['finalPrice'] + (float)$settings->gift_fee : (float)$item['element']['finalPrice'],
                            'item_name' => $item['element']['name'],
                            'item_type' => class_basename($product),
                            'notes' => $item['notes'] ? $item['notes'] : null,
                            'product_size' => $productAttribute ? $productAttribute->size->name : ($product->size ? $product->size->name : null),
                            'product_color' => $productAttribute ? $productAttribute->color->name : ($product->color ? $product->color->name : null),
                            'wrap_as_gift' => $item['wrapGift']
                        ]);
                    } else if ($item['type'] === 'service') {
                        // later we should check of multi Booking !!!
                        $timing = Timing::whereId($item['timing_id'])->first();
                        $order->order_metas()->create([
                            'order_id' => $order->id,
                            'service_id' => $item['service_id'],
                            'qty' => $item['qty'],
                            'price' => (float)$item['element']['finalPrice'],
                            'item_name' => $item['element']['name'],
                            'item_type' => $item['type'],
                            'notes' => $item['notes'] ? $item['notes'] : null,
                            'timing_id' => $item['timing_id'],
                            'booked_at' => Carbon::parse($timing->date .' '. $timing->time),
                            'time' => Carbon::parse($timing->date .' '. $timing->time),
                        ]);
                    }
                }
                if ($order->cash_on_delivery) {
                    $contactus = Setting::first();
                    dispatch(new sendSuccessOrderEmail($order, $order->user, $contactus))->delay(now()->addSeconds(10));
                }
                return $order;
            }
            return trans('message.order_is_not_created');
        } catch (\Exception $e) {
            return $e->getLine() . ' - ' . $e->getMessage() . ' - ' . $e->getFile();
        }
    }

    public function decreaseQty(Order $order)
    {
        try {
            if ($order->paid) {
                $order->order_metas->each(function ($orderMeta) use ($order) {
                    if ($orderMeta->type === 'product') {
                        if ($orderMeta->ordermetable->check_stock) {
                            if ($orderMeta->ordermetable->has_attributes) {
                                $decrement = (int)$orderMeta->product_attribute->qty - (int)$orderMeta->qty > 0 ? (int)$orderMeta->product_attribute->qty - (int)$orderMeta->qty : 0;
                                $orderMeta->product_attribute->update(['qty' => $decrement]);
                            } else {
                                // ordermetable is the product itself
                                $decrement = (int)$orderMeta->ordermetable->qty - (int)$orderMeta->qty > 0 ? (int)$orderMeta->ordermetable->qty - (int)$orderMeta->qty : 0;
                                $orderMeta->ordermetable->update(['qty' => $decrement]);
                            }
                        }
                    } else {
//                        dd('stop here');
                        // in case you want to do something for services
                    }
                });
            }
        } catch (\Throwable $e) {
            abort(500, $e->getMessage());
        }
    }

    public function createOrderForMirsal(Order $order, User $user)
    {
        try {
//            $sender = $order->order_metas->first()->product->user;
            $metas = $order->order_metas()->with('product.user')->get();
            if (env('MIRSAL_ENABLED') && !$order->shipment_reference && $order->paid && $order->user->country->is_local) {
                $pickupPoints = [];
                foreach ($metas as $meta) {
                    array_push($pickupPoints, [
                        'name' => $meta->product->user->name,
                        'phone' => $meta->product->user->fullMobile,
                        'governorate_id' => $meta->product->user->area,
                        'area_id' => $meta->product->user->localArea ? $meta->product->user->localArea->code : null,
                        'block' => $meta->product->user->block,
                        'street' => $meta->product->user->street,
                        'apartment' => $meta->product->user->appartment,
                        'unit' => 'Floor :' . $meta->product->user->floor,
                        'location' => $meta->product->user->address,
                        'note' => 'Product Name : ' . $meta->product->name . ' - Product SKU : ' . $meta->product->sku,
                    ]);
                }
                $url = env('MIRSAL_API_URL');
                $access_key = env('MIRSAL_ACCESS_KEY');
                $access_secret = env('MIRSAL_SECRET_KEY');
                $prog_lang = 'other';
                $data = [
                    'content' => 'Order Id : ' . $order->id,
                    'cost' => (float)$order->net_price,
                    'payment_method' => $order->payment_method,
                    'default_sender ' => env('APP_NAME'),
//                    'sender_name' => $sender->name,
//                    'sender_phone' => $sender->mobile,
//                    'sender_governorate' => 'A241',
//                    'sender_area' => 'FH242',
//                    'sender_block' => '00',
//                    'sender_street' => '00000',
//                    'sender_apartment' => $sender->apartment,
//                    'sender_avenue' => $sender->address,
//                    'sender_unit' => '0000',
//                    'sender_floor' => $sender->floor,
//                    'sender_note' => 'Sender Address :' . $sender->address . ' - ' . $sender->description,
//                    'sender_location' => '',
                    'receiver_name' => $user->name,
                    'receiver_phone' => $order->mobile,
                    'receiver_governorate' => 'A242',
                    'receiver_area' => 'JL244',
                    'receiver_block' => '0000',
                    'receiver_street' => '0000',
                    'receiver_apartment' => $order->address,
                    'receiver_avenue' => '',
                    'receiver_unit' => '',
                    'receiver_floor' => $order->address,
                    'receiver_note' => 'Receiver Address : ' . $order->address . ' - Notes :' . $order->notes,
                    'receiver_location' => $order->user->country->name,
                    'pickup_date' => Carbon::now()->addHours(5)->format('d/m/Y'),
                    'pickup_time' => Carbon::tomorrow()->addHours(10)->format('h:s a'),
                    'image' => '',
                    'pickup_points' => [
                        $pickupPoints
                    ],
                ];
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_POSTFIELDS, ['request_data' => json_encode($data), 'access_key' => $access_key, 'prog_lang' => $prog_lang]);
                $response = curl_exec($ch);
                $res = collect(json_decode($response));
                if ($res['status'] === "201") {
                    $order->update(['shipment_reference' => 'Mirsal - ' . $res['data']->transaction_id]);
                }
                curl_close($ch);
            }
        } catch (\Exception $e) {
            print_r($e->getMessage() . '- Mirsal Error');
        }
    }

    public function updateOrderRerferenceId($orderId, $referenceId, $paymentMethod)
    {
        Order::whereId($orderId)->first()->update([
            'reference_id' => $referenceId,
            'payment_method' => $paymentMethod
        ]);
    }
}
