<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NationalEventExtraLightResource;
use App\Models\NationalEvent;
use App\Services\Search\Filters;
use Illuminate\Http\Request;

class NationalEventController extends Controller
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

    public function search(Filters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = NationalEventExtraLightResource::collection(Nationalevent::active()->filters($filters)->with('user')
            ->orderBy('order', 'desc')
            ->paginate(Self::TAKE_LEAST)
            ->withQueryString());
        return $elements;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\NationalEvent  $nationalevent
     * @return \Illuminate\Http\Response
     */
    public function show(NationalEvent $nationalevent)
    {
        $element = NationalEventExtraLightResource::make(NationalEvent::whereId($nationalevent->id)->with('images','user','slides')->first());
        return response()->json($element, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\NationalEvent  $nationalevent
     * @return \Illuminate\Http\Response
     */
    public function edit(NationalEvent $nationalevent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\NationalEvent  $nationalevent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, NationalEvent $nationalevent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\NationalEvent  $nationalevent
     * @return \Illuminate\Http\Response
     */
    public function destroy(NationalEvent $nationalevent)
    {
        //
    }
}
