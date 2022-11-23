<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceStore;
use App\Http\Requests\ServiceUpdate;
use App\Http\Resources\ServiceCollection;
use App\Models\Category;
use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Service::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route("backend.service.search", request()->getQueryString());
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'service');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new ServiceCollection(Service::filters($filters)
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/Service/ServiceIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::active()->hasMerchantBehaviour()->with('role')->get();
        $categories = Category::onlyParent()->onlyForBooks()->with(['children' => function ($q) {
            return $q->onlyForBooks()->with(['children' => function ($q) {
                return $q->onlyForBooks();
            }]);
        }])->get();
        return inertia('Backend/Service/ServiceCreate', compact('users', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ServiceStore $request)
    {
        $element = Service::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'start_sale', 'end_sale', 'videos']));
        if ($element) {
            $element->tags()->sync($request->tags);
            $element->videos()->sync($request->videos);
            $element->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($element, $request, 'file') : null;
            return redirect()->route('backend.service.edit', $element->id)->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.service.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        $users = User::active()->hasMerchantBehaviour()->with('role')->get();
        $categories = Category::onlyParent()->onlyForProducts()->with(['children' => function ($q) {
            return $q->onlyForBooks()->with(['children' => function ($q) {
                return $q->onlyForBooks();
            }]);
        }])->get();
        $service = $service->whereId($service->id)->with('images', 'user', 'categories')->first();
        $elementCategories = $service->categories->pluck('id')->toArray();
        request()->session()->remove('prev');
        request()->session()->put('prev', url()->previous());
        return inertia('Backend/Service/ServiceEdit', compact('service', 'users', 'categories', 'elementCategories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function update(ServiceUpdate $request, Service $service)
    {
        try {
            $updated = $service->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr', 'file']));
            if ($updated) {
                $request->has('tags') ? $service->tags()->sync($request->tags) : null;
                $request->has('videos') ? $service->videos()->sync($request->videos) : null;
                $request->has('categories') ? $service->categories()->sync($request->categories) : null;
                $request->hasFile('image') ? $this->saveMimes($service, $request, ['image'], ['1080', '1440'], true, true) : null;
                $request->hasFile('qr') ? $this->saveMimes($service, $request, ['qr'], ['300', '300'], false) : null;
                $request->hasFile('file') ? $this->savePath($service, $request, 'file') : null;
                return redirect()->to(request()->session()->get('prev') ? request()->session()->get('prev') : route('backend.service.index'))
                    ->with('success', trans('general.process_success'));
            }
            return redirect()->route('backend.service.edit', $service->id)->with('error', 'process_failure');
        } catch (\Exception $e) {
            return redirect()->route('backend.service.edit', $service->id)->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        try {
            $orders = Order::paid()->whereHas('order_metas', fn($q) => $q->services()->where('ordermetable_id', $service->id), '>', 0)->get();
            if ($orders->isEmpty()) {
                $service->images()->delete();
                $service->slides()->delete();
                $service->tags()->detach();
                $service->comments()->delete();
                $service->favorites()->delete();
                $service->categories()->detach();
                if ($service->delete()) {
                    return redirect()->back()->with('success', trans('general.process_success'));
                }
            }
            return redirect()->back()->with('error', trans('general.element_can_not_be_deleted_there_are_some_orders_relying_on_this_element'));
        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }
}
