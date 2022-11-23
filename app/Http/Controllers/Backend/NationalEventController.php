<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\NationalEventUpdate;
use App\Http\Resources\NationalEventCollection;
use App\Models\Category;
use App\Models\Nationalevent;
use App\Models\User;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class NationalEventController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Nationalevent::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route("backend.nationalevent.search", request()->getQueryString());
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'nationalevent');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new NationalEventCollection(Nationalevent::filters($filters)
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/NationalEvent/NationalEventIndex', compact('elements'));
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
        return inertia('Backend/NationalEvent/NationalEventCreate', compact('users', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $element = Nationalevent::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'start_sale', 'end_sale', 'videos']));
        if ($element) {
            $element->tags()->sync($request->tags);
            $element->videos()->sync($request->videos);
            $element->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($element, $request, 'file') : null;
            return redirect()->route('backend.nationalevent.edit', $element->id)->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.nationalevent.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Nationalevent $nationalevent
     * @return \Illuminate\Http\Response
     */
    public function show(Nationalevent $nationalevent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Nationalevent $nationalevent
     * @return \Illuminate\Http\Response
     */
    public function edit(Nationalevent $nationalevent)
    {
        $users = User::active()->hasMerchantBehaviour()->with('role')->get();
        $categories = Category::onlyParent()->onlyForProducts()->with(['children' => function ($q) {
            return $q->onlyForBooks()->with(['children' => function ($q) {
                return $q->onlyForBooks();
            }]);
        }])->get();
        $element = $nationalevent->whereId($nationalevent->id)->with('images', 'user', 'categories')->first();
        $elementCategories = $nationalevent->categories->pluck('id')->toArray();
        request()->session()->remove('prev');
        request()->session()->put('prev', url()->previous());
        return inertia('Backend/NationalEvent/NationalEventEdit', compact('element', 'users', 'categories', 'elementCategories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Nationalevent $nationalevent
     * @return \Illuminate\Http\Response
     */
    public function update(NationalEventUpdate $request, Nationalevent $nationalevent)
    {
        try {
            $updated = $nationalevent->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr', 'file']));
            if ($updated) {
                $request->has('tags') ? $nationalevent->tags()->sync($request->tags) : null;
                $request->has('videos') ? $nationalevent->videos()->sync($request->videos) : null;
                $request->has('categories') ? $nationalevent->categories()->sync($request->categories) : null;
                $request->hasFile('image') ? $this->saveMimes($nationalevent, $request, ['image'], ['1080', '1440'], true, true) : null;
                $request->hasFile('qr') ? $this->saveMimes($nationalevent, $request, ['qr'], ['300', '300'], false) : null;
                $request->hasFile('file') ? $this->savePath($nationalevent, $request, 'file') : null;
                return redirect()->to(request()->session()->get('prev') ? request()->session()->get('prev') : route('backend.nationalevent.index'))
                    ->with('success', trans('general.process_success'));
            }
            return redirect()->route('backend.nationalevent.edit', $nationalevent->id)->with('error', 'process_failure');
        } catch (\Exception $e) {
            return redirect()->route('backend.nationalevent.edit', $nationalevent->id)->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Nationalevent $nationalevent
     * @return \Illuminate\Http\Response
     */
    public function destroy(Nationalevent $nationalevent)
    {
        //
    }
}
