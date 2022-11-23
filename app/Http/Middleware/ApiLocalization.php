<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Foundation\Application;

class ApiLocalization
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $lang = $request->hasHeader('lang') ? $request->header('lang') : app()->getLocale();
        app()->setLocale($lang);
        Carbon::setLocale($lang);
        $response = $next($request);
        $response->headers->set('lang', $lang);
        return $response;
    }
}
