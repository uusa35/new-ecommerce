<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" style="text-align:  {{ app()->getLocale() === 'ar' ? 'right' : 'left' }} !important;">
@component('mail::message')
@component('mail::panel')
# {{ trans('general.name') }} : {{ request()->first_name }} {{ request()->last_name }}
# {{ trans('general.email') }} : {{ request()->email }}
# {{ trans('general.mobile') }} : {{ request()->mobile }}
@endcomponent

# {{ trans('general.subject') }}
@component('mail::panel')
{{request()->content}}
@endcomponent

@component('mail::button', ['url' => config('app.url')])
{{ config('app.name') }}
@endcomponent

{{ trans('general.thanks_contacting_us') }},<br>
{{ config('app.name') }}
@endcomponent
</div>
