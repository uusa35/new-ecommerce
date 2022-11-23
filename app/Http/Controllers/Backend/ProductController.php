<?php

namespace App\Http\Controllers\Backend;

use App\Exports\ProductsExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStore;
use App\Http\Requests\ProductUpdate;
use App\Http\Resources\ProductCollection;
use App\Imports\ProductsImport;
use App\Models\AttributeValue;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Order;
use App\Models\Product;
use App\Models\Size;
use App\Models\User;
use App\Services\Search\ProductFilters;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;


class ProductController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Product::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.product.search', request()->getQueryString());
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'product');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return inertia('Backend/Product/ProductIndex', $validator->errors()->all());
        }
        $elements = new ProductCollection(Product::filters($filters)->with('variants.attributes')
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with(['user'])
            ->orderBy('id', 'desc')->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/Product/ProductIndex', compact('elements'));
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
        $categories = Category::onlyParent()->onlyForProducts()
            ->with(['children' => fn($q) => $q->onlyForProducts()
            ])->select('id', 'name_ar', 'name_en')->get();
        $attributesValues = AttributeValue::with('attribute')->get();
        return inertia('Backend/Product/ProductCreate', compact('users', 'categories', 'brands','attributesValues'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductStore $request)
    {
        $element = Product::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'start_sale', 'end_sale', 'videos']));
        if ($element) {
            $element->tags()->sync($request->tags);
            $element->videos()->sync($request->videos);
            $element->categories()->sync($request->categories);
            $request->hasFile('image') ? $this->saveMimes($element, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($element, $request, ['qr'], ['300', '300'], false) : null;
            $request->has('images') ? $this->saveGallery($element, $request, 'images', ['1080', '1440'], false) : null;
            $request->hasFile('size_chart_image') ? $this->saveMimes($element, $request, ['size_chart_image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('file') ? $this->savePath($element, $request, 'file') : null;
            return redirect()->route('backend.product.edit', $element->id)->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.product.create')->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $element = $product->with('product_attributes', 'color', 'size', 'user', 'images', 'user')->first();
        return inertia('Backend/Product/ProductShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        $users = User::active()->hasMerchantBehaviour()->select('id', 'name_ar', 'name_en')->get();
        $sizes = Size::active()->select('id', 'name_ar', 'name_en')->get();
        $colors = Color::active()->select('id', 'name_ar', 'name_en')->get();
        $brands = Brand::active()->select('id', 'name_ar', 'name_en')->get();
        $categories = Category::onlyParent()->onlyForProducts()
            ->with(['children' => fn($q) => $q->onlyForProducts()
                ->with(['children' => fn($q) => $q->onlyForProducts()])
            ])->select('id', 'name_ar', 'name_en')->get();
        $product = $product->whereId($product->id)->with('images', 'user', 'categories')->first();
        $elementCategories = $product->categories->pluck('id')->toArray();
        request()->session()->remove('prev');
        request()->session()->put('prev', url()->previous());
        return inertia('Backend/Product/ProductEdit', compact('users', 'sizes', 'colors', 'categories', 'product', 'elementCategories', 'brands'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductUpdate $request, Product $product)
    {
        $updated = $product->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr', 'size_chart_image']));
        if ($updated) {
            $request->has('tags') ? $product->tags()->sync($request->tags) : null;
            $request->has('videos') ? $product->videos()->sync($request->videos) : null;
            $request->has('categories') ? $product->categories()->sync($request->categories) : null;
            $request->hasFile('image') ? $this->saveMimes($product, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($product, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('size_chart_image') ? $this->saveMimes($product, $request, ['size_chart_image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('file') ? $this->savePath($product, $request, 'file') : null;
            return redirect()->to(request()->session()->get('prev') ? request()->session()->get('prev') : route('backend.product.index'))
                ->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.product.edit', $product->id)->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        try {
            $orders = Order::paid()->whereHas('order_metas', fn($q) => $q->products()->where('ordermetable_id', $product->id), '>', 0)->get();
            if ($orders->isEmpty()) {
                $product->product_attributes()->delete();
                $product->images()->delete();
                $product->slides()->delete();
                $product->tags()->detach([], true);
                $product->favorites()->delete();
                $product->categories()->detach([], true);
                $product->comments()->delete();
                if ($product->delete()) {
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
        $elements = Product::filters($filters)->with('product_attributes', 'color', 'size')
            ->whereHas('user', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('id', auth()->id()))
            ->with(['user' => fn($q) => $q->select('name_ar', 'name_en', 'id')])
            ->orderBy('id', 'desc');
        return Excel::download(new ProductsExport($elements), 'elements.' . request()->fileType);
    }

    public function getImport(Request $request)
    {
        $request->validate(['model' => 'required']);
        $users = User::active()->hasMerchantBehaviour()->select('id', 'name_ar', 'name_en')->get();
        $model = request()->model;
        return Inertia::render('Backend/Import/ImportProductCreate', compact('users', 'model'));
    }

    public function postImport(Request $request)
    {
        $request->validate([
            'model' => 'required',
            'user_id' => 'required|exists:users,id',
            "file" => "required|mimes:xlsx|max:990000"
        ]);
        $path = request()->file('file')->store('public/uploads/files');
        $result = Excel::import(new ProductsImport(request()->user_id), $path);
        return redirect()->route('backend.'.request()->model.'.index')->with('success', trans('general.process_success'));
    }

}
