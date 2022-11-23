<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceCollection;
use App\Http\Resources\ServiceExtraLightResource;
use App\Http\Resources\ServiceResource;
use App\Models\Order;
use App\Models\OrderMeta;
use App\Models\Service;
use App\Services\Search\Filters;
use App\Services\Search\ProductFilters;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FrontendServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Filters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Frontend/Service/FrontendServiceIndex', $validator->errors()->all());
        }
        $elements = new ServiceCollection(Service::active()->filters($filters)
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Frontend/Service/FrontendServiceIndex', compact('elements'));
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
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service, Filters $filters)
    {
        $currentElement = Service::whereId($service->id)->with('user', 'images', 'ratings')->with(['timings' => function ($q) {
            return $q->active()->whereDate('date', '>', Carbon::now());
        }])->first();
        $orderMetas = Order::where('paid', true)->whereHas('order_metas', function ($q) use ($currentElement) {
            return $q->where(['ordermetable_id' => $currentElement->id, 'ordermetable_type' => 'App\Models\Service'])->whereIn('timing_id', $currentElement->timings->pluck('id'));
        })->get()->pluck('order_metas')->flatten();
        // deactivate the timing if number of orders is greater than the limit.
        if ($orderMetas->isNotEmpty()) {
            foreach ($currentElement->timings as $timing) {
                if ($orderMetas->where('timing_id', $timing->id)->count() + 1 > $timing->limit) {
                    $timing->update(['active' => 0]);
                }
            }
        }
        $element = ServiceResource::make($currentElement);
        request()->request->add(['category_id' => $element->categories->pluck('id')->flatten()->unique()->toArray()]);
        $relatedElements = new ServiceCollection(Service::filters($filters)->orderBy('id', 'desc')->paginate(Self::TAKE_FOUR));
        return inertia('Frontend/Service/FrontendServiceShow', compact('element', 'relatedElements'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        //
    }
}
