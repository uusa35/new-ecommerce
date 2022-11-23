@extends('layouts.app')

@section('content')
    <main class="sm:container sm:mx-auto sm:max-w-lg sm:mt-10" dir={{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr'}}>
        <div class="flex">
            <div class="w-full">
                <section class="flex flex-col break-words bg-white sm:border-1 sm:rounded-md sm:shadow-sm sm:shadow-lg">

                    <header class="font-semibold bg-gray-200 text-gray-800 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
                        @lang('general.login')
                    </header>

                    <form class="w-full px-6 space-y-6 sm:px-10 sm:space-y-8 mb-10" method="POST"
                          action="{{ route('login') }}">
                        @csrf

                        <div class="flex flex-wrap">
                            <label for="email" class="block text-gray-800 text-sm font-bold mb-2 sm:mb-4">
                                @lang('general.email'):
                            </label>

                            <input id="email" type="email"
                                   class="form-input w-full @error('email') border-red-500 @enderror" name="email"
                                   value="{{ old('email') }}" required autocomplete="email" autofocus>

                            @error('email')
                            <p class="text-red-500 text-xs italic mt-4">
                                {{ $message }}
                            </p>
                            @enderror
                        </div>

                        <div class="flex flex-wrap">
                            <label for="password" class="block text-gray-800 text-sm font-bold mb-2 sm:mb-4">
                                @lang('general.password'):
                            </label>

                            <input id="password" type="password"
                                   class="form-input w-full @error('password') border-red-500 @enderror" name="password"
                                   required>

                            @error('password')
                            <p class="text-red-500 text-xs italic mt-4">
                                {{ $message }}
                            </p>
                            @enderror
                        </div>

                        <div class="flex items-center">
                            <label class="inline-flex items-center text-sm text-gray-800" for="remember">
                                <input type="checkbox" name="remember" id="remember" class="form-checkbox"
                                    {{ old('remember') ? 'checked' : '' }}>
                                <span class="mx-2">@lang('general.remember_me')</span>
                            </label>

                            @if (Route::has('password.request'))
                                <a class="text-sm text-gray-500 hover:text-gray-800 whitespace-no-wrap no-underline hover:underline ml-auto mx-10"
                                   href="{{ route('password.request') }}">
                                    @lang('general.forget_password')
                                </a>
                            @endif
                        </div>

                        <div class="flex flex-wrap">
                            <button type="submit"
                                    class="w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-50 bg-gray-500 hover:bg-gray-800 sm:py-4">
                                @lang('login')
                            </button>

                            <a
                                href="{{ route('frontend.home') }}"
                                class="text-center w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-50 bg-gray-400 hover:bg-gray-800 sm:py-4 my-4">
                                @lang('general.home')
                            </a>

                            {{--                        @if (Route::has('register'))--}}
                            {{--                        <p class="w-full text-xs text-center text-gray-800 my-6 sm:text-sm sm:my-8">--}}
                            {{--                            @lang('general.dont_have_account')--}}
                            {{--                            <a class="text-gray-500 hover:text-gray-800 no-underline hover:underline" href="{{ route('register') }}">--}}
                            {{--                                @lang('general.register')--}}
                            {{--                            </a>--}}
                            {{--                        </p>--}}
                            {{--                        @endif--}}
                        </div>
                    </form>

                </section>
            </div>
        </div>
    </main>
@endsection
