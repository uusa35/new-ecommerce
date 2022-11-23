<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Application;
use App\Models\Currency;


class ApiCurrency
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
        $currency = !$request->hasHeader('currency') ? Currency::where('currency_symbol_en', 'KWD')->first()->currency_symbol_en : $request->header('currency');
        $response = $next($request);
        $response->headers->set('currency', $currency);
        return $response;
    }
}
