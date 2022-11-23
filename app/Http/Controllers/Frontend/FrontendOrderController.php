<?php

namespace App\Http\Controllers\Frontend;

use App\Events\OrderPaidEvent;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Setting;
use App\Notifications\OrderPaid;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;

class FrontendOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        $order->load('order_metas.ordermetable', 'user', 'coupon');
        return inertia('Frontend/Order/OrderShow', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function makeOrderPaid(Request $request)
    {
        $order = Order::whereId($request->id)->with('user')->first();
        $order->update(['paid' => true, 'status' => 'paid']);
        $user = $order->user;
        $user->notify(new OrderPaid($user, $order));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function makeOrderFailed(Order $order)
    {
        $order->load('user')->update(['paid' => false, 'status' => 'failed']);
        $user = $order->user;
        dd($user);
        $order->notify(new OrderPaid());
    }

    public function makeNotify($id)
    {
        OrderPaidEvent::dispatch(auth()->id(), trans('general.thank_you_for_ur_purchase'));
    }

    public function viewInvoice(Request $request)
    {
        request()->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        if (auth()->id() == $request->user_id) {
            $order = Order::whereId(request()->id)->with('order_metas.ordermetable', 'order_metas.merchant', 'user', 'coupon')->first();
            $settings = Setting::first();
            $markdown = new Markdown(view(), config('mail.markdown'));
            return $markdown->render('emails.orders.paid', ['order' => $order, 'settings' => $settings]);
        }
        return redirect()->back()->with(['error' => trans('general.process_failure')]);
    }
}
