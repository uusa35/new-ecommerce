<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthExtraLightResource;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CountryCollection;
use App\Http\Resources\CountryExtraLightResource;
use App\Http\Resources\CourseCollection;
use App\Http\Resources\CourseResource;
use App\Http\Resources\OrderCollection;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ServiceCollection;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\Book;
use App\Models\Country;
use App\Models\Course;
use App\Models\Order;
use App\Models\Role;
use App\Models\Service;
use App\Models\Subscription;
use App\Models\User;
use App\Services\Search\OrderFilters;
use App\Services\Search\ProductFilters;
use App\Services\Search\UserFilters;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class FrontendUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UserFilters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new UserCollection(User::active()->filters($filters)->notAdmins()->notClients()
            ->whereHas('role', fn($q) => $q->where('is_visible', true))
            ->paginate(SELF::TAKE_LESS)
            ->withQueryString());
        return inertia('Frontend/User/FrontendUserIndex', compact('elements'));
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
        $request->validate([
            'name' => 'required|min:3|max:200',
            'email' => 'required|email|unique:users,email',
            'mobile' => 'min:4|max:12',
            'country_id' => 'required|exists:countries,id',
            'governate_id' => 'exists:governates,id',
            'area_id' => 'exists:areas,id',
            'block' => 'max:20',
            'street' => 'max:200',
            'building' => 'max:20',
            'apartment' => 'max:20',
            'floor' => 'max:20',
        ]);
        $country = Country::whereId(request()->country_id)->with('governates.areas')->first();
        $request->request->add([
            'name_ar' => $request->name,
            'name_en' => $request->name,
            'password' => Hash::make('secret'),
            'role_id' => Role::where('is_client', true)->first()->id,
            'subscription_id' => Subscription::all()->first()->id,
            'country_id' => $request->country_id,
            'governate_id' => $request->has('governate_id') ? $request->governate_id : $country->governates->first()->id,
            'area_id' => $request->has('area_id') ? $request->area_id : $country->governates->first()->areas->first()->id,
            'email_verified_at' => Carbon::today()

        ]);
        $user = User::create($request->all());
        if ($user) {
            $auth = new UserResource($user);
            auth()->login($user);
            return redirect()->back()->with(['auth' => $auth, 'success' => trans('general.process_success')]);
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $element = new UserResource($user->load('role', 'images', 'ratings'));
        $books = BookCollection::make($element->books()->active()->paginate(SELF::TAKE_MIN));
        $products = ProductCollection::make($element->products()->active()->with('categories.children')->paginate(SELF::TAKE_MIN));
        $categories = CategoryCollection::make($products->pluck('categories')->flatten());
        return inertia('Frontend/User/FrontendUserShow', compact('element', 'products', 'books', 'categories'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Request
     */
    public function getProducts(ProductFilters $filters)
    {
        $element = new UserResource(User::whereId(request()->id)->with('role', 'images', 'ratings')->first());
        $books = BookCollection::make($element->books()->active()->paginate(SELF::TAKE_MIN));
        $products = ProductCollection::make($element->products()->filters($filters)->active()->with('categories.children')->paginate(SELF::TAKE_MIN));
        $categories = CategoryCollection::make($products->pluck('categories')->flatten()->unique('id'));
        return inertia('Frontend/User/FrontendUserShow', compact('element', 'products', 'books', 'categories'));
    }


    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Request
     */
    public function getOrders(OrderFilters $filters)
    {
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = new OrderCollection(Order::filters($filters)
            ->where(['user_id' => auth()->id(), 'paid' => true])
            ->with('user')
            ->orderBy('id', 'desc')->paginate(Self::TAKE_MID)
            ->withQueryString());
        return inertia('Frontend/User/Profile/ProfileOrderIndex', compact('elements'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $this->authorize('update', $user);
        $user = new UserResource($user->load('role'));
        $countries = new CountryCollection(Country::active()->whereHas('governates', fn($q) => $q->active()->whereHas('areas', fn($q) => $q->active(), '>', 0), '>', 0)
            ->with(['governates' => fn($q) => $q->active()->whereHas('areas', fn($q) => $q->active()
            )->with('areas')
            ])->get());

        return inertia('Frontend/User/FrontendUserEdit', compact('user', 'countries'));
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
        $request->validate([
            'name_ar' => 'min:3|max:255',
            'name_en' => 'min:3|max:255',
            'mobile' => 'min:4|max:12',
            'whatsapp' => 'min:5|max:12',
            'news_letter_on' => 'boolean',
            'country_id' => 'exists:countries,id',
            'governate_id' => 'exists:governates,id',
            'area_id' => 'exists:areas,id',
        ]);
        $updated = $user->update($request->except(['_token', 'image']));
        if ($updated) {
            $request->hasFile('image') ? $this->saveMimes($user, $request, ['image'], ['500', '500'], false) : null;
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
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

    public function getResetPassword()
    {
        return inertia('Frontend/User/Profile/ProfileResetPassword');
    }

    public function postResetPassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|min:6',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $user = auth()->attempt(['email' => auth()->user()->email, 'password' => $request->old_password]);
        if ($user && auth()->user()->update(['password' => Hash::make($request->password)])) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function getCourses()
    {
        $orders = Order::where(['user_id' => auth()->id(), 'paid' => true])->with(['order_metas' => function ($q) {
            return $q->where('ordermetable_type', 'App\Models\Course');
        }])->get();
        $firstOrder = $orders->first();
        $ids = array_values($orders->pluck('order_metas')->flatten()->pluck('ordermetable.id')->toArray());
        $elements = CourseCollection::make(Course::whereIn('id', $ids)->with('images', 'user')->paginate(SELF::TAKE_LESS));
        return inertia('Frontend/User/Profile/ProfileCourseIndex', compact('elements', 'firstOrder'));
    }

    public function getCourse(Request $request)
    {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:courses,id',
            'session_id' => 'required|integer',
            'order_id' => 'required|integer|exists:orders,id'
        ]);
        $order = Order::where(['paid' => true, 'user_id' => auth()->id()])->with(['order_metas' => function ($q) {
            return $q->where(['ordermetable_type' => 'App\Models\Course']);
        }])->get();
        if (in_array(request()->id, $order->pluck('order_metas')->flatten()->pluck('ordermetable_id')->toArray())) {
            $element = new CourseResource(Course::whereId($request->id)->with('user', 'images')->with(['comments' => function ($q) {
                return $q->where('session_id', request()->session_id);
            }])->first());
            return inertia('Frontend/User/Profile/ProfileCourseShow', compact('element'));
        }
        return redirect()->bakc()->with('error', trans('general.process_failure'));
    }

    public function getServices()
    {
        $orders = Order::where(['user_id' => auth()->id(), 'paid' => true])->with(['order_metas' => function ($q) {
            return $q->where('ordermetable_type', 'App\Models\Service');
        }])->get();
        $firstOrder = $orders->first();
        $ids = array_values($orders->pluck('order_metas')->flatten()->pluck('ordermetable.id')->toArray());
        $elements = ServiceCollection::make(Service::whereIn('id', $ids)->with('images', 'user')->paginate(SELF::TAKE_LESS));
        return inertia('Frontend/User/Profile/ProfileServiceIndex', compact('elements', 'firstOrder'));
    }

    public function getService(Request $request)
    {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:courses,id',
            'session_id' => 'required|integer',
            'order_id' => 'required|integer|exists:orders,id'
        ]);
        $order = Order::where(['paid' => true, 'user_id' => auth()->id()])->with(['order_metas' => function ($q) {
            return $q->where(['ordermetable_type' => 'App\Models\Service']);
        }])->get();
        if (in_array(request()->id, $order->pluck('order_metas')->flatten()->pluck('ordermetable_id')->toArray())) {
            $element = new ServiceResource(Service::whereId($request->id)->with('user', 'images')->with(['comments' => function ($q) {
                return $q->where('session_id', request()->session_id);
            }])->first());
            return inertia('Frontend/User/Profile/ProfileServiceShow', compact('element'));
        }
        return redirect()->bakc()->with('error', trans('general.process_failure'));
    }

    public function getBooks()
    {
        $orders = Order::where(['user_id' => auth()->id(), 'paid' => true])->with(['order_metas' => function ($q) {
            return $q->where('ordermetable_type', 'App\Models\Book');
        }])->get();
        $firstOrder = $orders->first();
        $ids = array_values($orders->pluck('order_metas')->flatten()->pluck('ordermetable.id')->toArray());
        $elements = ServiceCollection::make(Book::whereIn('id', $ids)->with('images', 'user')->paginate(SELF::TAKE_LESS));
        return inertia('Frontend/User/Profile/ProfileBookIndex', compact('elements', 'firstOrder'));
    }

    public function getBook(Request $request)
    {
        $request->validate([
            'reference_id' => 'required',
            'id' => 'required|exists:books,id',
            'session_id' => 'required|integer',
            'order_id' => 'required|integer|exists:orders,id'
        ]);
        $order = Order::where(['paid' => true, 'user_id' => auth()->id()])->with(['order_metas' => function ($q) {
            return $q->where(['ordermetable_type' => 'App\Models\Book']);
        }])->get();
        if (in_array(request()->id, $order->pluck('order_metas')->flatten()->pluck('ordermetable_id')->toArray())) {
            $element = new BookResource(Book::whereId($request->id)->with('user', 'images')->with(['comments' => function ($q) {
                return $q->where('session_id', request()->session_id);
            }])->first());
            return view('book.show', compact('element'));
            return inertia('Frontend/User/Profile/ProfileBookShow', compact('element'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function getFreeBook(Request $request)
    {
        $element = new BookResource(Book::whereId($request->id)->with('user', 'images')->first());
        if ($element->free) {
            return view('book.show', compact('element'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function getFavorites()
    {
        return inertia('Frontend/User/Profile/ProfileFavoriteIndex');
    }

    public function getSettings()
    {
        $user = new UserResource(User::whereId(auth()->id())->first());
        return inertia('Frontend/User/Profile/ProfileSettingIndex', compact('user'));
    }

    public function getLogin()
    {
        if (!auth()->user()) {
            return inertia('Frontend/User/LoginForm');
        }
        return inertia('Backend/BackendHomePage');
//        return redirect()->route('backend.home');
    }

    public function postLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
        if (auth()->attempt(['email' => $request->email, 'password' => $request->password])) {
            $auth = new AuthExtraLightResource(User::whereId($request->user()->id)->with(['role' => function ($q) {
                return $q->with(['privileges' => function ($q) {
                    return $q->orderBy('order', 'asc');
                }]);
            }])->first());
            return inertia('Backend/BackendHomePage', compact('auth'))->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with(['error' => trans('general.process_failure')]);
    }

    public function getRegistration()
    {
        $countries = CountryExtraLightResource::collection(Country::has('governates.areas', '>', 0)->active()->get());
        return inertia('Frontend/User/RegisterForm', compact('countries'));
    }

    public function postRegistration(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:4|max:255',
            'email' => 'required|email|string|unique:users',
            'mobile' => 'required|min:4|max:12',
            'password' => 'required|min:8|confirmed|max:50',
            'code' => 'required|confirmed',
            'country_id' => 'required|exists:countries,id'
        ]);
        $user = User::create([
            'name' => $request->name,
            'name_ar' => $request->name,
            'name_en' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'whatsapp' => $request->mobile,
            'password' => Hash::make($request->password),
            'role_id' => Role::where(['is_client' => true])->first()->id,
            'country_id' => $request->country_id,
            'subscription_id' => Subscription::all()->random()->id,
            'email_verified_at' => Carbon::now()
        ]);
        if ($user) {
            auth()->loginUsingId($user->id);
            return redirect()->route('frontend.home')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }


    public function logmein(Request $request) {
        auth()->loginUsingId($request->id);
        return redirect()->route('frontend.home');
    }

}
