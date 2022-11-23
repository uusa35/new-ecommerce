<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\AddressCollection;
use App\Http\Resources\CountryCollection;
use App\Models\Address;
use App\Models\Country;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Address::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->validate([
            'user_id' => 'integer|exists:users,id'
        ]);
        $elements = Address::query();
        $request->has('user_id') ? $elements->where(['user_id' => $request->user_id]) : $elements->where(['user_id' => auth()->id()]);
        $elements =  new AddressCollection($elements->paginate(SELF::TAKE_LESS));
        return inertia('Backend/Address/AddressIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        request()->validate([
            'user_id' => 'integer|exists:users,id'
        ]);
        $countries = new CountryCollection(Country::active()->has('areas','>', 0)->with('areas')->get());
        return inertia('Backend/Address/AddressCreate', compact('countries'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:200',
            'block' => 'nullable|min:1|max:200',
            'street' => 'nullable|min:1|max:200',
            'building' => 'nullable|min:1|max:200',
            'floor' => 'nullable|min:1|max:200',
            'content' => 'nullable|min:1|max:200',
            'user_id' => 'integer|exists:users,id',
            'country_id' => 'integer|exists:countries,id',
            'area_id' => 'integer|exists:areas,id'
        ]);
        if (Address::create($request->all())) {
            return redirect()->route('backend.address.index', [ 'user_id'  => request()->user_id ])->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function show(Address $address)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function edit(Address $address)
    {
        $countries = new CountryCollection(Country::active()->has('areas','>', 0)->with('areas')->get());
        return inertia('Backend/Address/AddressEdit', compact('address', 'countries'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        $request->validate([
            'name' => 'required|max:200',
            'block' => 'nullable|min:1|max:200',
            'street' => 'nullable|min:1|max:200',
            'building' => 'nullable|min:1|max:200',
            'floor' => 'nullable|min:1|max:200',
            'content' => 'nullable|min:1|max:200',
            'user_id' => 'required|integer|exists:users,id',
            'country_id' => 'integer|exists:countries,id',
            'area_id' => 'integer|exists:areas,id'
        ]);
        if ($address->update($request->all())) {
            return redirect()->route('backend.address.index', ['user_id' => request()->user_id])->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        $id = $address->user_id;
        if ($address->delete()) {
            return redirect()->route('backend.address.index', ['user_id' => $id])->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }
}
