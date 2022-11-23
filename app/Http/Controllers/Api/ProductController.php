<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\Search\ProductFilters;
use http\Env\Response;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = Product::active()->get();
        return response()->json($elements, 200);
    }

    public function search(ProductFilters $filters)
    {
//        if(request()->header('x-api-key') != 12345) {
//            return response()->json(['data' => 'NOT the key'], 400);
//        }
        $elements = new ProductCollection(Product::active()->filters($filters)->with('variants.attributes')
            ->orderBy('order', 'desc')
            ->paginate(Self::TAKE_LEAST)
            ->setPath('')
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
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $element = ProductResource::make(Product::whereId($product->id)->with('images', 'variants.attributes', 'categories', 'user')->first());
        return response()->json($element, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $element = $product->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'start_sale', 'end_sale', 'videos']));
        return response()->json($product, 200);
        if ($element) {
            return \response()->json(['data' => $element, 'message' => 'updated'], 200);
        }
        return \response()->json(['message' => 'updated'], 400);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
