<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseStore;
use App\Http\Requests\CourseUpdate;
use App\Http\Resources\CourseCollection;
use App\Models\Course;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class CourseController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Course::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.course.search', request()->getQueryString());
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'course');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Backend/Course/CourseIndex', $validator->errors()->all());
        }
        $elements = new CourseCollection(Course::filters($filters)
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/Course/CourseIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::active()->authors()->get();
        $categories = Category::onlyParent()->onlyForCourses()->with(['children' => function ($q) {
            return $q->onlyForCourses()->with(['children' => function ($q) {
                return $q->onlyForCourses();
            }]);
        }])->get();
        return inertia('Backend/Course/CourseCreate', compact('users', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(CourseStore $request)
    {
        $element = Course::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags']));
        if ($element) {
            $element->tags()->sync($request->tags);
            $element->videos()->sync($request->videos);
            $element->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($element, $request, 'file') : null;
            return redirect()->route('backend.course.edit', $element->id)->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.course.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course)
    {
        $users = User::active()->authors()->get();
        $categories = Category::onlyParent()->onlyForCourses()->with(['children' => function ($q) {
            return $q->onlyForCourses()->with(['children' => function ($q) {
                return $q->onlyForCourses();
            }]);
        }])->get();
        $course = $course->whereId($course->id)->with('images', 'user', 'categories')->first();
        $elementCategories = $course->categories->pluck('id')->toArray();
        request()->session()->remove('prev');
        request()->session()->put('prev', url()->previous());
        return inertia('Backend/Course/CourseEdit', compact('course', 'users', 'categories', 'elementCategories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\Response
     */
    public function update(CourseUpdate $request, Course $course)
    {
        $updated = $course->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr', 'size_chart_image']));
        if ($updated) {
            $request->has('tags') ? $course->tags()->sync($request->tags) : null;
            $request->has('videos') ? $course->videos()->sync($request->videos) : null;
            $request->has('categories') ? $course->categories()->sync($request->categories) : null;
            $request->hasFile('image') ? $this->saveMimes($course, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($course, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($course, $request, 'file') : null;
            return redirect()->to(request()->session()->get('prev') ? request()->session()->get('prev') : route('backend.course.index'))
                ->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.course.edit', $course->id)->with('error', 'process_failure');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        try {
            $orders = Order::paid()->whereHas('order_metas', fn($q) => $q->courses()->where('ordermetable_id', $course->id), '>', 0)->get();
            if ($orders->isEmpty()) {
                $course->images()->delete();
                $course->slides()->delete();
                $course->tags()->detach();
                $course->comments()->delete();
                $course->favorites()->delete();
                $course->categories()->detach();
                if ($course->delete()) {
                    return redirect()->route('backend.course.search');
                }
            }
            return redirect()->back()->with('error', trans('general.element_can_not_be_deleted_there_are_some_orders_relying_on_this_element'));
        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }
}
