<?php

namespace App\Http\Controllers\Backend;

use App\Exports\UsersExport;
use App\Http\Requests\UserStore;
use App\Http\Requests\UserUpdate;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CountryCollection;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\RoleExtraLightResource;
use App\Http\Resources\SubscriptionCollection;
use App\Http\Resources\UserCollection;
use App\Http\Controllers\Controller;
use App\Imports\UsersImport;
use App\Models\Category;
use App\Models\Country;
use App\Models\Role;
use App\Models\Subscription;
use App\Models\User;
use App\Services\Search\UserFilters;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(User::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect()->route('backend.user.search', request()->getQueryString());
    }

    public function search(UserFilters $filters)
    {
        $this->authorize('search', 'user');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $roles = RoleExtraLightResource::collection(Role::active()->where('is_visible', true)->get());
        $elements = new UserCollection(User::filters($filters)->notAdmins()
            ->with('role')
            ->orderBy('id', 'desc')
            ->paginate(Self::TAKE_LESS)
            ->withQueryString());
        return inertia('Backend/User/UserIndex', compact('elements', 'roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = new RoleCollection(Role::active()->where('is_super', false)->get());
        $categories = new CategoryCollection(Category::active()->onlyParent()->onlyForUsers()->with(['children' => function ($q) {
            return $q->active()->onlyForUsers()->with(['children' => function ($q) {
                return $q->active()->onlyForUsers();
            }]);
        }])->get());
        $countries = new CountryCollection(Country::active()->whereHas('governates', fn($q) => $q->active()->whereHas('areas', fn($q) => $q->active(), '>', 0), '>', 0)
            ->with(['governates' => fn($q) => $q->active()->whereHas('areas', fn($q) => $q->active()
            )->with('areas')
            ])->get());
        $subscriptions = new SubscriptionCollection(Subscription::active()->get());
        return inertia('Backend/User/UserCreate', compact('roles', 'categories', 'countries', 'subscriptions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserStore $request)
    {
        $user = User::create($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr']));
        if ($user) {
            $request->has('tags') ? $user->tags()->sync($request->tags) : null;
            $request->has('videos') ? $user->videos()->sync($request->videos) : null;
            $request->has('categories') ? $user->categories()->sync($request->categories) : null;
            $request->hasFile('image') ? $this->saveMimes($user, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($user, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('file') ? $this->savePath($user, $request, 'file') : null;
            return redirect()->route('backend.user.index')->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.user.edit', $user->id)->with('error', 'process_failure');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $element = $user->with('role.privileges')->first();
        return inertia('Backend/User/UserShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $user->load('categories', 'images', 'country', 'area', 'subscription');
        $roles = new RoleCollection(Role::active()->where('is_super', false)->get());
        $categories = new CategoryCollection(Category::active()->onlyParent()->onlyForUsers()->with(['children' => function ($q) {
            return $q->active()->onlyForUsers()->with(['children' => function ($q) {
                return $q->active()->onlyForUsers();
            }]);
        }])->get());
        $elementCategories = $user->categories->pluck('id')->toArray();
        $countries = new CountryCollection(Country::active()->whereHas('governates', fn($q) => $q->active()->whereHas('areas', fn($q) => $q->active(), '>', 0), '>', 0)
            ->with(['governates' => fn($q) => $q->active()->whereHas('areas', fn($q) => $q->active()
            )->with('areas')
            ])->get());
        $subscriptions = new SubscriptionCollection(Subscription::active()->get());
        request()->session()->remove('prev');
        request()->session()->put('prev', url()->previous());
        return inertia('Backend/User/UserEdit', compact('user', 'roles', 'elementCategories', 'categories', 'countries', 'subscriptions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdate $request, User $user)
    {
        $updated = $user->update($request->except(['_token', 'image', 'images', 'categories', 'slides', 'tags', 'videos', 'qr']));
        if ($updated) {
            $request->has('tags') ? $user->tags()->sync($request->tags) : null;
            $request->has('videos') ? $user->videos()->sync($request->videos) : null;
            $request->has('categories') ? $user->categories()->sync($request->categories) : null;
            $request->hasFile('image') ? $this->saveMimes($user, $request, ['image'], ['1080', '1440'], true, true) : null;
            $request->hasFile('qr') ? $this->saveMimes($user, $request, ['qr'], ['300', '300'], false) : null;
            $request->hasFile('banner') ? $this->saveMimes($user, $request, ['banner'], ['1900', '255'], false) : null;
            $request->hasFile('file') ? $this->savePath($user, $request, 'file') : null;
            return redirect()->to(request()->session()->get('prev') ? request()->session()->get('prev') : route('backend.user.index'))
                ->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.user.edit', $user->id)->with('error', 'process_failure');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            $user->books()->delete();
            $user->products()->delete();
            $user->services()->delete();
            $user->courses()->delete();
            $user->images()->delete();
            $user->slides()->delete();
            $user->tags()->detach();
            $user->comments()->delete();
            $user->favorites()->delete();
            $user->categories()->detach();
            $user->delete();
            return redirect()->back()->with('success', trans('general.process_success'));
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    public function getResetPassword(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:users,id'
        ]);
        return inertia('Backend/User/ResetPassword');
    }

    public function postResetPassword(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:users,id',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $authenticated = auth()->user()->isAdminOrAbove || auth()->id() === $request->id;
        if ($authenticated) {
            User::whereId($request->id)->first()->update(['password' => Hash::make($request->password)]);
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    public function makeEmailVerified(Request $request)
    {
        $this->authorize('isSuper');
        $request->validate([
            'id' => 'required|integer|exists:users,id',
        ]);
        User::whereId($request->id)->first()->update(['email_verified_at' => Carbon::now()]);
        return redirect()->back()->with('success', trans('general.process_success'));
    }

    public function export(UserFilters $filters)
    {
        $this->authorize('search', 'user');
        $elements = User::filters($filters)->with('role')->orderBy('id', 'desc');
        return Excel::download(new UsersExport($elements), 'elements.' . request()->fileType);
    }

    public function getImport(Request $request)
    {
        $request->validate(['model' => 'required']);
        $roles = Role::active()->notAdmins()->where('is_visible', true)->select('id', 'name_ar', 'name_en')->get();
        $countries = Country::has('governates.areas', '>', 0)->active()->select('id', 'name_ar', 'name_en')->get();
        $model = request()->model;
        return Inertia::render('Backend/Import/ImportUserCreate', compact('roles', 'model', 'countries'));
    }

    public function postImport(Request $request)
    {
        $request->validate([
            'model' => 'required',
            'country_id' => 'required|exists:countries,id',
            'role_id' => 'required|exists:roles,id',
            "file" => "required|mimes:xlsx|max:990000"
        ]);
        $path = request()->file('file')->store('public/uploads/files');
        $result = Excel::import(new UsersImport(request()->role_id, request()->country_id), $path);
        return redirect()->route('backend.' . request()->model . '.index')->with('success', trans('general.process_success'));
    }
}
