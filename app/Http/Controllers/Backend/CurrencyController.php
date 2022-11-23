<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CountryCollection;
use App\Http\Resources\CurrencyCollection;
use App\Models\Country;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Currency::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new CurrencyCollection(Currency::paginate(Self::TAKE_LESS));
        return inertia('Backend/Currency/CurrencyIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $countries = new CountryCollection(Country::active()->get());
        return inertia('Backend/Currency/CurrencyCreate', compact('countries'));
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
            'name_ar' => 'required|max:200',
            'name_en' => 'required|max:200',
            'currency_symbol_ar' => 'string|max:5',
            'currency_symbol_en' => 'string|max:5',
            'order' => 'numeric|max:99',
            'exchange_rate' => 'numeric|max:99',
            'country_id' => 'integer|exists:countries,id'
        ]);
        $element = Currency::create($request->except('image'));
        if ($element) {
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['300', '300'], false) : null;
            return redirect()->route('backend.currency.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Currency $currency
     * @return \Illuminate\Http\Response
     */
    public function show(Currency $currency)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Currency $currency
     * @return \Illuminate\Http\Response
     */
    public function edit(Currency $currency)
    {
        $currency->load('country');
        $countries = new CountryCollection(Country::active()->get());
        return inertia('Backend/Currency/CurrencyEdit', compact('currency', 'countries'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Currency $currency
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Currency $currency)
    {
        $request->validate([
            'name_ar' => 'max:200',
            'name_en' => 'max:200',
            'currency_symbol_ar' => 'string|max:5',
            'currency_symbol_en' => 'string|max:5',
            'order' => 'numeric|max:99',
            'exchange_rate' => 'numeric|max:99',
            'country_id' => 'integer|exists:countries,id'
        ]);
        if ($currency->update($request->except('image'))) {
            $request->hasFile('image') ? $this->saveMimes($currency, $request, ['image'], ['300', '300'], false) : null;
            return redirect()->route('backend.currency.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Currency $currency
     * @return \Illuminate\Http\Response
     */
    public function destroy(Currency $currency)
    {
        //
    }
}
