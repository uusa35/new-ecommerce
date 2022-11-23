<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostStore;
use App\Http\Requests\PostUpdate;
use App\Http\Resources\PostCollection;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Post::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route("backend.post.search", request()->getQueryString());
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'post');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new PostCollection(Post::filters($filters)
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/Post/PostIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::active()->hasMerchantBehaviour()->select('id', 'name_ar', 'name_en')->get();
        $brands = Brand::active()->select('id', 'name_ar', 'name_en')->get();
        $categories = Category::onlyParent()->with('children.children')->select('id', 'name_ar', 'name_en')->get();
        return inertia('Backend/Post/PostCreate', compact('users', 'categories', 'brands'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public
    function store(PostStore $request)
    {
        $element = Post::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'start_sale', 'end_sale', 'videos']));
        if ($element) {
            $element->tags()->sync($request->tags);
            $element->videos()->sync($request->videos);
            $element->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], false) : null;
            $request->has('images') ? $this->saveGallery($element, $request, 'images', ['1080', '1440'], false) : null;
            $request->hasFile('size_chart_image') ? $this->saveMimes($element, $request, ['size_chart_image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('file') ? $this->savePath($element, $request, 'file') : null;
            return redirect()->route('backend.post.edit', $element->id)->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.post.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $element = $post->with('user', 'images', 'user')->first();
        return inertia('Backend/Post/PostShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        $users = User::active()->hasMerchantBehaviour()->select('id', 'name_ar', 'name_en')->get();
        $brands = Brand::active()->select('id', 'name_ar', 'name_en')->get();
        $categories = Category::onlyParent()->onlyForProducts()
            ->with(['children' => fn($q) => $q->onlyForProducts()
                ->with(['children' => fn($q) => $q->onlyForProducts()])
            ])->select('id', 'name_ar', 'name_en')->get();
        $post = $post->whereId($post->id)->with('images', 'user', 'categories')->first();
        $elementCategories = $post->categories->pluck('id')->toArray();
        request()->session()->remove('prev');
        request()->session()->put('prev', url()->previous());
        return inertia('Backend/Product/ProductEdit', compact('post','users', 'categories', 'elementCategories', 'brands'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(PostUpdate $request, Post $post)
    {
        $updated = $post->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr', 'size_chart_image']));
        if ($updated) {
            $request->has('tags') ? $post->tags()->sync($request->tags) : null;
            $request->has('videos') ? $post->videos()->sync($request->videos) : null;
            $request->has('categories') ? $post->categories()->sync($request->categories) : null;
            $request->hasFile('image') ? $this->saveMimes($post, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($post, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($post, $request, 'file') : null;
            return redirect()->to(request()->session()->get('prev') ? request()->session()->get('prev') : route('backend.post.index'))
                ->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.post.edit', $post->id)->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if ($post->delete()) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }
}
