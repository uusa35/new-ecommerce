<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FrontendFavoriteController extends Controller
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
            'model' => 'required|string'
        ]);
        $className = 'App\Models\\' . ucfirst($request->model);
        $element = new $className();
        $element = $element->whereId($request->element_id)->with('favorites')->first();
        $favorite = $element->favorites()->where([
            'user_id' => $request->user()->id,
            'favoritable_type' => $className,
            'favoritable_id' => $request->element_id,
        ])->first();
        if (!is_null($favorite)) {
            $favorite->delete();
        } else {
            $element->favorites()->create([
                'user_id' => $request->user()->id,
                'favoritable_type' => $className,
                'favoritable_id' => $request->element_id,
            ]);
        }
        return redirect()->back()->with('success', trans('general.process_success'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Favorite $favorite
     * @return \Illuminate\Http\Response
     */
    public function show(Favorite $favorite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Favorite $favorite
     * @return \Illuminate\Http\Response
     */
    public function edit(Favorite $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Favorite $favorite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Favorite $favorite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Favorite $favorite)
    {
        //
    }
}
