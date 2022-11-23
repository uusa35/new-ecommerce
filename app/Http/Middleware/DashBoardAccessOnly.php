<?php

namespace App\Http\Middleware;

use Closure;

class DashBoardAccessOnly
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
//        abort_if((!auth()->check() && !auth()->user()->access_dashboard) || !auth()->user()->can('isAdminOrAbove'),'400',  'Contact Admins - Access denied !!!');
        abort_if(!auth()->check() && !auth()->user()->access_dashboard,'400',  'Contact Admins - Access denied !!!');
        return $next($request);
    }
}
