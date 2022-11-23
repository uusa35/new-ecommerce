<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request)->header(
            'Access-Allow-Cross-Origin', '*',
            'Access-Control-Allow-Methods', 'PUT,DELETE,PATCH,POST,OPTIONS',
            'Access-Control-Allow-Headers', 'Accept,Authentication,Content-Type',
        );
    }
}
