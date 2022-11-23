<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookCollection;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserExtraLightResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Search\UserFilters;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UserFilters $filters)
    {
        $elements = new UserCollection(User::active()->filters($filters)->notAdmins()->notClients()
            ->whereHas('role', fn($q) => $q->where('is_visible', true))
            ->paginate(SELF::TAKE_LARGE)
            ->withQueryString());
        return $elements;
    }

    public function search(UserFilters $filters)
    {
        $elements = new UserCollection(User::active()->filters($filters)->notAdmins()->notClients()
            ->whereHas('role', fn($q) => $q->where('is_visible', true))
            ->paginate(SELF::TAKE_LARGE)
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
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $element = new UserExtraLightResource($user->load('role', 'images', 'ratings'));
        $books = BookCollection::make($element->books()->active()->paginate(SELF::TAKE_MIN));
        $products = ProductCollection::make($element->products()->active()->with('categories.children')->paginate(SELF::TAKE_MIN));
        $categories = CategoryCollection::make($products->pluck('categories')->flatten());
        return response()->json(compact('element', 'products', 'categories'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

    public function postLogin(Request $request)
    {
        $validator = validator($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 404);
        }
        if (auth()->attempt($request->all())) {
            $element = User::where(['email' => $request->email])->with('role')->first();
            return response()->json(UserResource::make($element), 200);
        }
        return response()->json(['message' => trans('general.information_not_correct')], 404);
    }
}
