<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\SlideResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Course;
use App\Models\Product;
use App\Models\Service;
use App\Models\Slide;
use App\Models\User;
use App\Services\Search\Filters;
use Illuminate\Http\Request;

class SlideController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Slide::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.slide.search', [
            'slidable_id' => request()->slidable_id,
            'slidable_type' => request()->slidable_type,
        ]);
    }

    public function search(Filters $filters)
    {
        $this->authorize('search', 'slide');
        request()->validate([
            'slidable_id' => 'required|integer',
            'slidable_type' => 'required|string'
        ]);
        $elements = Slide::filters($filters)->with(['slidable' => function ($q) {
            if (request()->slidable_type !== 'user' && !auth()->user()->isAdminOrAbove) {
                return $q->whereHas('user', function ($q) {
                    return $q->where('id', auth()->id());
                });
            } else {
                return $q;
            }
        }])->orderBy('id', 'desc')
            ->paginate(Self::TAKE_LESS)
            ->withQueryString()
            ->through(fn($element) => [
                'id' => $element->id,
                'name_ar' => $element->name_ar,
                'name_en' => $element->name_en,
                'image' => $element->image,
                'active' => $element->active,
                'type' => $element->type,
                'slidable_type' => $element->realType,
                'slidable_id' => $element->slidable_id,
                'slidable' => $element->slidable->only('id', 'name_ar', 'name_en')
            ]);
        return inertia('Backend/Slide/SlideIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        request()->validate([
            'slidable_id' => 'required|integer',
            'slidable_type' => 'required|string'
        ]);
        $types = ['category', 'book', 'product', 'course', 'service', 'user','url','n_a'];
        $products = Product::active()->select('id', 'name_ar', 'name_en')->get();
        $services = Service::active()->select('id', 'name_ar', 'name_en')->get();
        $courses = Course::active()->select('id', 'name_ar', 'name_en')->get();
        $categories = Category::active()->onlyParent()->select('id', 'name_ar', 'name_en')->get();
        $books = Book::active()->select('id', 'name_ar', 'name_en')->get();
        $users = User::active()->authors()->select('id', 'name_ar', 'name_en')->get();
        return inertia('Backend/Slide/SlideCreate', compact('types', 'products', 'services', 'categories', 'courses', 'books', 'users'));
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
            'slidable_id' => 'required|integer',
            'slidable_type' => 'required|string',
            'image' => "image|max:".env('MAX_IMAGE_SIZE').'"'
        ]);
        $type = $request->slidable_type;
        $request->request->add(['slidable_type' => 'App\Models\\' . ucfirst($request->slidable_type)]);
        $element = Slide::create($request->except('image', '_token'));
        if ($element) {
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1900', '750'], true, true) : null;
            $request->hasFile('file') ? $this->savePath($element, $request, 'file') : null;
            return redirect()->route('backend.slide.index', [
                'slidable_type' => $type,
                'slidable_id' => $element->slidable_id
            ])->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.slide.index', [
            'slidable_type' => $type,
            'slidable_id' => $request->slidable_id,
        ])->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Slide $slide
     * @return \Illuminate\Http\Response
     */
    public function show(Slide $slide)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Slide $slide
     * @return \Illuminate\Http\Response
     */
    public function edit(Slide $slide)
    {
        $types = ['category', 'book', 'product', 'course', 'service', 'user','url','n_a'];
        $products = Product::active()->select('id', 'name_ar', 'name_en')->get();
        $services = Service::active()->select('id', 'name_ar', 'name_en')->get();
        $courses = Course::active()->select('id', 'name_ar', 'name_en')->get();
        $categories = Category::active()->onlyParent()->select('id', 'name_ar', 'name_en')->get();
        $books = Book::active()->select('id', 'name_ar', 'name_en')->get();
        $users = User::active()->authors()->select('id', 'name_ar', 'name_en')->get();
        return inertia('Backend/Slide/SlideEdit', compact('slide', 'types', 'products', 'services', 'categories', 'courses', 'books', 'users'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Slide $slide
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Slide $slide)
    {
        request()->validate([
//            'image' => "image|max:".env('MAX_IMAGE_SIZE').'"'
        ]);
        if ($slide->update($request->except('image'))) {
            $request->hasFile('image') ? $this->saveMimes($slide, $request, ['image'], ['1900', '750'], true , true) : null;
            $request->hasFile('file') ? $this->savePath($slide, $request, 'file') : null;
            return redirect()->route('backend.slide.index', [
                'slidable_type' => 'setting',
                'slidable_id' => $slide->slidable_id
            ])->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Slide $slide
     * @return \Illuminate\Http\Response
     */
    public function destroy(Slide $slide)
    {
        if ($slide->delete()) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }
}
