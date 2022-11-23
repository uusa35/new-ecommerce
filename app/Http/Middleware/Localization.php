<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;

class Localization
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
        $lang = session()->has('lang') ? session()->get('lang') : 'ar';
        app()->setLocale($lang);
        Carbon::setLocale($lang);
        return $next($request);
    }
}
