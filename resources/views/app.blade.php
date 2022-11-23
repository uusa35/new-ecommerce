<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
{{--<html lang="{{ app()->getLocale() }}" style="background-color : {{$page['props']['settings']->theme === 'dark' ? $page['props']['settings']->btn_bg_theme_color : 'white' }}" class="scroll-auto">--}}
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body>
    <div id="lang" style="display: none">{{ app()->getLocale() }}</div>
    <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
        @inertia
        <div id="modal-root"></div>
    </body>
</html>
