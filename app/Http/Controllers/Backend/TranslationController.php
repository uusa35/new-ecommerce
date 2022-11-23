<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\TranslationLightResource;
use App\Models\Translation;
use App\Services\Search\TranslationFilters;
use Illuminate\Http\Request;

class TranslationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.translation.search',request()->getQueryString());
    }

    public function search(TranslationFilters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Backend/Translation/TranslationIndex', $validator->errors()->all());
        }
        $elements = TranslationLightResource::collection(Translation::filters($filters)->paginate(Self::TAKE_MID)
            ->withQueryString());
        return inertia('Backend/Translation/TranslationIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Translation/TranslationCreate');
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
            'ar' => 'required|max:999',
            'en' => 'required|max:999',
            'key' => 'required|max:99|alpha_dash',
        ]);
        if (Translation::create($request->all())) {
            return redirect()->route('backend.translation.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Translation $translation
     * @return \Illuminate\Http\Response
     */
    public function show(Translation $translation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Translation $translation
     * @return \Illuminate\Http\Response
     */
    public function edit(Translation $translation)
    {
        return inertia('Backend/Translation/TranslationEdit', compact('translation'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Translation $translation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Translation $translation)
    {
        $request->validate([
            'ar' => 'required|max:999',
            'en' => 'required|max:999',
            'key' => 'required|max:99|alpha_dash',
        ]);
        if ($translation->update($request->all())) {
            return redirect()->route('backend.translation.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Translation $translation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Translation $translation)
    {
        if ($translation->delete()) {
            return redirect()->route('backend.translation.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }
}
