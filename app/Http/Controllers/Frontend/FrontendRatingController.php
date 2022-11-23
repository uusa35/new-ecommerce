<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class FrontendRatingController extends Controller
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
        request()->validate([
            'element_id' => 'required|integer',
            'value' => 'required|numeric|min:10|max:100',
            'model' => 'required|string'
        ]);
        $className = 'App\Models\\' . ucfirst($request->model);
        $element = new $className();
        $element = $element->whereId($request->element_id)->with('ratings')->first();
        $rating = $element->ratings()->updateOrCreate([
            'user_id' => $request->user()->id,
            'ratingable_type' => $className,
            'ratingable_id' => $request->element_id,
        ]);
        $rating->update(['value' => $request->value]);
        $rating->save();
        return redirect()->back()->with('success', trans('general.process_success'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Rating $rating
     * @return \Illuminate\Http\Response
     */
    public function show(Rating $rating)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Rating $rating
     * @return \Illuminate\Http\Response
     */
    public function edit(Rating $rating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Rating $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rating $rating)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Rating $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rating $rating)
    {
        //
    }
}
