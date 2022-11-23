<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Resources\BookExtraLightResource;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryExtraLightResource;
use App\Http\Resources\CourseExtraLightResource;
use App\Http\Resources\ProductExtraLightResource;
use App\Http\Resources\SlideExtraLightResource;
use App\Http\Resources\UserExtraLightResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Course;
use App\Models\Product;
use App\Models\Setting;
use App\Models\User;
use App\Services\Search\CategoryFilters;


trait HomeTrait
{
    public function getEcommerce()
    {
        $settings = Setting::whereId(1)->with(['slides' => function ($q) {
            return $q->active()->orderby('order', 'asc');
        }])->first();
//        $slides = SlideExtraLightResource::collection($settings->slides);
//        $newOnHomeProducts = ProductExtraLightResource::collection(Product::active()->onHome()->onNew()->with('variants.attributes')->orderBy('order', 'asc')->get());
//        $categoriesWithProducts = CategoryExtraLightResource::collection(Category::active()->onlyParent()->onlyForProducts()->where('is_featured', true)->orderBy('order', 'asc')->limit(3)->with('products.variants.attributes')->get());
//        return inertia('Frontend/Home/' . env('APP_NAME'), compact('slides', 'newOnHomeProducts', 'categoriesWithProducts'));
//        return redirect()->route('backend.home');
    }

    public function getGrc()
    {
        $settings = Setting::whereId(1)->with(['slides' => function ($q) {
            return $q->active()->orderby('order', 'asc');
        }])->first();
        $slides = SlideExtraLightResource::collection($settings->slides);
        $newOnHomeBooks = BookExtraLightResource::collection(Book::active()->onHome()->onNew()->orderBy('order', 'asc')->get());
        $newOnHomeCourses = CourseExtraLightResource::collection(Course::active()->onHome()->onNew()->orderBy('order', 'asc')->get());
        $onHomeParticipantAuthors = UserExtraLightResource::collection(User::active()->onHome()->authors()->notClients()->notAdmins()->orderBy('order', 'asc')->get());
        return inertia('Frontend/Home/' . env('APP_NAME'), compact('slides', 'newOnHomeBooks', 'onHomeParticipantAuthors', 'newOnHomeCourses'));
    }

    public function getIstores()
    {
        $settings = Setting::whereId(1)->with(['slides' => function ($q) {
            return $q->active()->orderby('order', 'asc');
        }])->first();
        $slides = SlideExtraLightResource::collection($settings->slides);
        $categoriesWithProducts = CategoryExtraLightResource::collection(Category::active()->onlyParent()->onlyForProducts()->where('is_featured', true)->orderBy('order', 'asc')->limit(3)->with('products.product_attributes')->get());
        return inertia('Frontend/Home/' . env('APP_NAME'), compact('slides', 'categoriesWithProducts'));
    }

    public function getDesktop(CategoryFilters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = CategoryCollection::make(Category::active()->filters($filters)->orderBy('order', 'asc')
            ->paginate(Self::TAKE_LARGE)->withQueryString());
        return inertia('Frontend/Category/FrontendCategoryIndex', compact('elements'));
    }
}
