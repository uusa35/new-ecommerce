<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Country;
use Illuminate\Foundation\Application;

class ApiCountry
{
    public $app;

    /**
     * Localization constructor.
     *
     * @param \Illuminate\Foundation\Application $app
     */
    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $country = !$request->hasHeader('currency') ? Country::where('is_local', true)->first()->name : $request->header('country');
        $response->headers->set('country', $country);
        return $response;
    }
}
