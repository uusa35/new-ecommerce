@extends('layouts.app')

@section('content')
<main class="sm:container sm:mx-auto sm:max-w-lg sm:mt-10" dir={{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr'}}>
    <div class="flex">
        <div class="w-full">
            <section class="flex flex-col break-words bg-white sm:border-1 sm:rounded-md sm:shadow-sm sm:shadow-lg">

                <header class="font-semibold bg-gray-200 text-gray-800 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
                    @lang('general.register')
                </header>

                <form class="w-full px-6 space-y-6 sm:px-10 sm:space-y-8" method="POST"
                    action="{{ route('register') }}">
                    @csrf

                    <div class="flex flex-wrap">
                        <label for="name" class="block text-gray-800 text-sm font-bold mb-2 sm:mb-4">
                            @lang('general.name'):
                        </label>

                        <input id="name" type="text" class="form-input w-full @error('name')  border-red-500 @enderror"
                            name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                        @error('name')
                        <p class="text-red-500 text-xs italic mt-4">
                            {{ $message }}
                        </p>
                        @enderror
                    </div>

                    <div class="flex flex-wrap">
                        <label for="email" class="block text-gray-800 text-sm font-bold mb-2 sm:mb-4">
                            @lang('general.email') :
                        </label>

                        <input id="email" type="email"
                            class="form-input w-full @error('email') border-red-500 @enderror" name="email"
                            value="{{ old('email') }}" required autocomplete="email">

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
                            required autocomplete="new-password">

                        @error('password')
                        <p class="text-red-500 text-xs italic mt-4">
                            {{ $message }}
                        </p>
                        @enderror
                    </div>

                    <div class="flex flex-wrap">
                        <label for="password-confirm" class="block text-gray-800 text-sm font-bold mb-2 sm:mb-4">
                            @lang('general.confirm_password'):
                        </label>

                        <input id="password-confirm" type="password" class="form-input w-full"
                            name="password_confirmation" required autocomplete="new-password">
                    </div>

                    <div class="flex flex-wrap">
                        <button type="submit"
                            class="w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-100 bg-gray-500 hover:bg-gray-800 sm:py-4">
                            @lang('general.register')
                        </button>

                        <p class="w-full text-xs text-center text-gray-800 my-6 sm:text-sm sm:my-8">
                            @lang('general.already_have_account')
                            <a class="text-gray-500 hover:text-gray-800 no-underline hover:underline" href="{{ route('login') }}">
                                @lang('general.login')
                            </a>
                        </p>

                        <a
                            href="{{ route('frontend.home') }}"
                            class="text-center w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-50 bg-gray-400 hover:bg-gray-800 sm:py-4 my-4">
                            @lang('general.home')
                        </a>
                    </div>
                </form>

            </section>
        </div>
    </div>
</main>
@endsection
