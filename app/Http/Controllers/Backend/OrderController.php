<?php

namespace App\Http\Controllers\Backend;

use App\Exports\OrdersExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderCollection;
use App\Models\Order;
use App\Models\Setting;
use App\Services\Search\OrderFilters;
use App\Services\Traits\OrderTrait;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Maatwebsite\Excel\Facades\Excel;

class OrderController extends Controller
{
    use OrderTrait;

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Order::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.order.search', request()->getQueryString());
    }

    public function search(OrderFilters $filters)
    {
        $this->authorize('search', 'order');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new OrderCollection(Order::filters($filters)
            ->whereHas('order_metas.ordermetable', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/Order/OrderIndex', compact('elements'));
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
        $order->load('order_metas.ordermetable', 'order_metas.merchant', 'user', 'coupon');
        return inertia('Backend/Order/OrderShow', compact('order'));
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
        if ($order->order_metas()->delete() && $order->delete()) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function switchStatus(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'status' => 'required|string'
        ]);
        try {
            $order = Order::whereId($request->order_id)->with('user', 'order_metas.ordermetable', 'order_metas.product_attribute')->first();
            $updated = $order->update(['status' => $request->status]);
            if ($updated) {
                if ($request->status === 'paid') {
                    $order->update(['paid' => true]);
                    $settings = Setting::first();
                    if ($settings->enable_products) {
                        $this->decreaseQty($order);
                    }
                }
                return redirect()->back()->with('success', trans('general.process_success'));
            }
            return redirect()->back()->with('error', trans('general.process_failure'));
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function export(OrderFilters $filters)
    {
        $this->authorize('search', 'product');
        $elements = Order::filters($filters)
            ->whereHas('order_metas.ordermetable', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with(['user' => fn($q) => $q->select('name_ar', 'name_en', 'id')])
            ->orderBy('id', 'desc');


        return Excel::download(new OrdersExport($elements), 'elements.' . request()->fileType);
    }

    public function viewInvoice()
    {
        $order = Order::whereId(request()->id)->with('order_metas.ordermetable', 'order_metas.merchant', 'user', 'coupon')->first();
        $settings = Setting::first();
        $markdown = new Markdown(view(), config('mail.markdown'));
        return $markdown->render('emails.orders.paid', ['order' => $order, 'settings' => $settings]);
    }

    public function downloadInvoiceToPDF(Order $order)
    {
        $order = Order::whereId(request()->id)->with('order_metas.ordermetable', 'order_metas.merchant', 'user', 'coupon')->first();
        $printMode = true;
        return inertia('Backend/Order/OrderShow', compact('order', 'printMode'));
//        $order = Order::whereId(request()->id)->with('order_metas.ordermetable','order_metas.merchant', 'user', 'coupon')->first();
//        $settings = Setting::first();
////        return view('emails.orders.invoice', compact('order', 'settings'));
//        $pdf = Pdf::loadView('emails.orders.invoice', compact('order', 'settings'))
//            ->setOptions(['defaultFont' => 'sans-serif' , 'charset' => 'utf-8'])
//            ->setPaper('a4', 'landscape');
//         return $pdf->stream('invoice.pdf');
    }

}
