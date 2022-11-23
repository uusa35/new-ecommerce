<?php

namespace App\Http\Controllers;

use App\Http\Resources\CountryCollection;
use App\Http\Resources\GovernateCollection;
use App\Models\Country;
use App\Models\Governate;
use App\Services\Search\CategoryFilters;
use Illuminate\Http\Request;

class GovernateController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Governate::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(CategoryFilters $filters)
    {
        $elements = new GovernateCollection(Governate::filters($filters)->with('country')->orderBy('id','desc')->paginate(Self::TAKE_LESS));
        return inertia('Backend/Governate/GovernateIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $countries = new CountryCollection(Country::active()->get());
        return inertia('Backend/Governate/GovernateCreate', compact('countries'));
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
            'country_id' => 'required|exists:countries,id',
            'order' => 'numeric|max:99'
        ]);
        if (Governate::create($request->all())) {
            return redirect()->route('backend.governate.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Governate $governate
     * @return \Illuminate\Http\Response
     */
    public function show(Governate $governate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Governate $governate
     * @return \Illuminate\Http\Response
     */
    public function edit(Governate $governate)
    {
        $governate->load('country');
        $countries = new CountryCollection(Country::active()->get());
        request()->session()->remove('prev');
        request()->session()->put('prev', url()->previous());
        return inertia('Backend/Governate/GovernateEdit', compact('governate', 'countries'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Governate $governate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Governate $governate)
    {
        $request->validate([
            'name_ar' => 'max:200',
            'name_en' => 'max:200',
            'country_id' => 'required|exists:countries,id',
            'order' => 'numeric|max:99'
        ]);
        if ($governate->update($request->all())) {
            return redirect()->to(request()->session()->get('prev') ? request()->session()->get('prev') : route('backend.governate.index'))
                ->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Governate $governate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Governate $governate)
    {
        if($governate->areas()->delete() && $governate->delete()) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }
}
