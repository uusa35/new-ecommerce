<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" style="text-align:  {{ app()->getLocale() === 'ar' ? 'right' : 'left' }} !important;">
@component('mail::message')
@if(request()->title)
@component('mail::panel')
# {{ request()->title }}
@endcomponent
@endif
@component('mail::panel')
# {{ trans('general.factory_name') }} : {{ request()->name }}
# {{ trans('general.email') }} : {{ request()->email }}
# {{ trans('general.mobile') }} : {{ request()->mobile }}
# {{ trans('general.address') }} : {{ request()->address }}
# {{ trans('general.website') }} : {{ request()->website }}
@if(request()->has('country_name'))
# {{ trans('general.country') }} : {{ request()->country_name }}
@endif
@endcomponent


@component('mail::panel')
# {{ trans('general.about_our_products') }}
# {{request()->content}}
@endcomponent
@if(request()->notes)
@component('mail::panel')
# {{ trans('general.other_notes') }}
# {{request()->notes}}
@endcomponent
@endif
@component('mail::panel')
# {{ trans('general.exported_before') }} : {{ request()->exported_before ? trans('general.yes') : trans('general.no') }}
@endcomponent
@if(request()->employee_name)
@component('mail::panel')
# {{ trans('general.employee_name') }}
# {{request()->employee_name}}
# {{ trans('general.employee_position') }}
# {{request()->employee_position}}
@endcomponent
@endif

@component('mail::button', ['url' => config('app.url')])
{{ config('app.name') }}
@endcomponent

{{ trans('general.thanks') }},<br>
{{ config('app.name') }}
@endcomponent
</div>
