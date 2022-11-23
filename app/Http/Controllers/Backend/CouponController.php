<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CouponCollection;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Coupon::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new CouponCollection(Coupon::orderBy('id','desc')->paginate(Self::TAKE_LESS));
        return inertia('Backend/Coupon/CouponIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Coupon/CouponCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'value' => 'required|numeric|max:99',
            "is_percentage" => 'required|numeric|max:50',
            "active" => 'boolean',
            "consumed" => 'boolean',
            "code" => 'required|min:4|max:20|alpha_num',
            "minimum_charge" => 'integer|max:99',
            "is_permanent" => 'boolean',
            "user_id" => 'integer|exists:users,id',
            'due_date' => 'required|date|after:yesterday',

        ]);
        if (Coupon::create($request->all())) {
            return redirect()->route('backend.coupon.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Coupon $coupon
     * @return \Illuminate\Http\Response
     */
    public function show(Coupon $coupon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Coupon $coupon
     * @return \Illuminate\Http\Response
     */
    public function edit(Coupon $coupon)
    {
        return inertia('Backend/Coupon/CouponEdit', compact('coupon'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Coupon $coupon
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Coupon $coupon)
    {
        $request->validate([
            'value' => 'required|numeric|max:99',
            "is_percentage" => 'required|numeric|max:50',
            "active" => 'boolean',
            "consumed" => 'boolean',
            "code" => 'required|min:4|max:20|alpha_num',
            "minimum_charge" => 'integer|max:99',
            "is_permanent" => 'boolean',
            "user_id" => 'integer|exists:users,id',
            'due_date' => 'required|date|after:yesterday',

        ]);
        if ($coupon->update($request->all())) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Coupon $coupon
     * @return \Illuminate\Http\Response
     */
    public function destroy(Coupon $coupon)
    {
        //
    }
}
