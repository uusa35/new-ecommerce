<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthExtraLightResource;
use App\Http\Resources\CurrencyExtraLightResource;
use App\Http\Resources\SettingExtraLightResource;
use App\Http\Resources\SettingResource;
use App\Models\Currency;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Inertia\Middleware;

class BackendHandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => $request->user() ? new AuthExtraLightResource(User::whereId($request->user()->id)->with(['role' => function ($q) {
                return $q->with(['privileges' => function ($q) {
                    return $q->orderBy('order', 'asc');
                }]);
            }])->first()) : null,
            'currencies' => fn() => CurrencyExtraLightResource::collection(Currency::active()->with('country')->get()),
            'settings' => fn() => new SettingResource(Setting::first()),
            'success' => fn() => $request->session()->get('success'),
            'error' => fn() => $request->session()->get('error'),
        ]);
    }
}
