<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" style="font-weight: bolder; text-align:  {{ app()->getLocale() === 'ar' ? 'right' : 'left' }} !important;">
@component('mail::message')
# {{ trans('general.username') }} : {{ $order->user->name_ar }} - {{ $order->user->name_en }}
# {{ trans('general.email') }} : {{ $order->user->email }}
# {{ trans('general.mobile') }} : {{ $order->user->mobile }}


{{ trans('general.message_order_failed') }}
@component('mail::button', ['url' => route('frontend.home')])
    {{ config('app.name') }}
@endcomponent

{{ trans('general.thanks') }},<br>
{{ config('app.name') }}
@endcomponent
</div>
