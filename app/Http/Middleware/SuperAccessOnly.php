<?php

namespace App\Http\Middleware;

use Closure;

class SuperAccessOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // will check is_super first then is_admin.
        abort_if(auth()->check() && !auth()->user()->can('isSuper'), '400',  'Super zone only !!!');
        return $next($request);
    }
}
