<?php

namespace App\Http\Controllers\Backend;

use App\Exports\BooksExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\BookStore;
use App\Http\Requests\BookUpdate;
use App\Http\Resources\BookCollection;
use App\Models\Book;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderMeta;
use App\Models\User;
use App\Services\Search\ProductFilters;
use Maatwebsite\Excel\Facades\Excel;

class BookController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Book::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.book.search', request()->getQueryString());
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'book');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Backend/Book/BookIndex', $validator->errors()->all());
        }
        $elements = new BookCollection(Book::filters($filters)
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/Book/BookIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::active()->authors()->get();
        $categories = Category::onlyParent()->onlyForBooks()->with(['children' => function ($q) {
            return $q->onlyForBooks()->with(['children' => function ($q) {
                return $q->onlyForBooks();
            }]);
        }])->get();
        return inertia('Backend/Book/BookCreate', compact('users', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(BookStore $request)
    {
        $element = Book::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags']));
        if ($element) {
            $element->tags()->sync($request->tags);
            $element->videos()->sync($request->videos);
            $element->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($element, $request, 'file') : null;
            return redirect()->route('backend.book.index')->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.book.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Book $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Book $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        $users = User::active()->authors()->get();
        $categories = Category::onlyParent()->onlyForProducts()->with(['children' => function ($q) {
            return $q->onlyForBooks()->with(['children' => function ($q) {
                return $q->onlyForBooks();
            }]);
        }])->get();
        $book = $book->whereId($book->id)->with('images', 'user', 'categories')->first();
        $elementCategories = $book->categories->pluck('id')->toArray();
        request()->session()->remove('prev');
        request()->session()->put('prev', url()->previous());
        return inertia('Backend/Book/BookEdit', compact('book', 'users', 'categories', 'elementCategories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Book $book
     * @return \Illuminate\Http\Response
     */
    public function update(BookUpdate $request, Book $book)
    {
        $updated = $book->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr', 'size_chart_image']));
        if ($updated) {
            $request->has('tags') ? $book->tags()->sync($request->tags) : null;
            $request->has('videos') ? $book->videos()->sync($request->videos) : null;
            $request->has('categories') ? $book->categories()->sync($request->categories) : null;
            $request->hasFile('image') ? $this->saveMimes($book, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($book, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($book, $request, 'file') : null;
            return redirect()->to(request()->session()->get('prev') ? request()->session()->get('prev') : route('backend.book.index'))
                ->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.book.edit', $book->id)->with('error', 'process_failure');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Book $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        try {
            $orders = Order::paid()->whereHas('order_metas', fn($q) => $q->books()->where('ordermetable_id', $book->id), '>', 0)->get();
            if ($orders->isEmpty()) {
                $book->images()->delete();
                $book->slides()->delete();
                $book->tags()->detach();
                $book->comments()->delete();
                $book->favorites()->delete();
                $book->categories()->detach();
                if($book->delete()) {
                    return redirect()->back()->with('success', trans('general.process_success'));
                }
            }
            return redirect()->back()->with('error', trans('general.element_can_not_be_deleted_there_are_some_orders_relying_on_this_element'));
        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    public function export(ProductFilters $filters)
    {
        $this->authorize('search', 'product');
        $elements = Book::filters($filters)
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with(['user' => fn($q) => $q->select('name_ar', 'name_en', 'id')])
            ->orderBy('id', 'desc');
        return Excel::download(new BooksExport($elements), 'elements.' . request()->fileType);
    }
}
