<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}" style="background-color: #edf2f7; font-weight: bolder; text-align:  {{ app()->getLocale() === 'ar' ? 'right' : 'left' }} !important;">
@component('mail::header', ['url' => route('frontend.home')])
{{--@component('mail::header', ['url' => config('app.url')])--}}
{{--<div style="margin: auto; width : 100%; padding-top: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center">--}}
{{--    <div>--}}
{{--        <img src="{{ asset(env('THUMBNAIL'). $settings->image) }}" alt="" style="width : 80px; height: auto; border-radius: 10px;"/>--}}
{{--    </div>--}}
{{--<div>--}}
<a href="{{ config('app.url') }}" style="display: block;
margin-left: auto;
margin-right: auto; max-width: 100px; padding-top: 10px;">
<img src="{{ asset(env('THUMBNAIL'). $order->user->image) }}" alt="" style="max-width: 100px; border-radius: 10px;"/>
</a>

{{--@endcomponent--}}
@component('mail::message')
# {{ trans('general.invoice_no') }} :  {{ $order->id }}
# {{ trans('general.username') }} : {{ $order->user->name_ar }} - {{ $order->user->name_en }}
# {{ trans('general.email') }} : {{ $order->user->email }}
# {{ trans('general.mobile') }} : {{ $order->user->mobile }}
<div style="text-align: left">
<a style="font-size: smaller" href="javascript:if(window.print)window.print()">{{ trans('general.print') }}</a>
</div>
@if($order->notes)
@component('mail::panel')
# {{ trans('general.notes') }} : {{ $order->notes }}
@endcomponent
@endif
@component('mail::table')
|       |  {{ trans('general.order_details') }}||
| ------------- |:-------------:| --------:|
@endcomponent
@component('mail::table')
| {{ trans('general.id') }}       |  {{ trans('general.name') }}         |  {{ trans('general.type') }}  |
| ------------- |:-------------:| --------:|
@foreach($order->order_metas as $meta)
| {{ ($loop->index+1) }}      | {{ $meta->name }}      |    {{ ucfirst($meta->ordermetable()->first()->type) }}   |
@if($meta->ordermetable()->first()->type === 'product')
| | {{ trans('general.color') }} : {{ $meta->color }}| |
| | {{ trans('general.size') }} : {{ $meta->size }}| |
@if($meta->notes)
| | {{ trans('general.notes') }} : {{ $meta->notes }} | |
@endif
| | {{ trans('general.merchant') }} : {{ $meta->ordermetable->user->name }} | |
@endif
@if($meta->ordermetable()->first()->type === 'service')
| | {{ trans('general.booked_at') }} : {{ $meta->booked_at }} | |
| | {{ trans('general.time') }} : {{ $meta->time }} | |
@if($meta->notes)
| | {{ trans('general.notes') }} : {{ $meta->notes }} | |
@endif
| | {{ trans('general.owner') }} : {{ $meta->ordermetable->user->name }} | |
@endif
@endforeach
@endcomponent

@component('mail::table')
|       |  {{ trans('general.invoice_summary') }}||
| ------------- |:-------------:| --------:|
@endcomponent
@component('mail::table')
|       |           |  {{ trans('general.total') }}  |
| ------------- |:-------------:| --------:|
| {{ trans('general.price') }}      |       |    {{ $order->price }}   {{ trans('general.kd') }}|
| {{ trans('general.shipment_fees') }}      |       |    {{ $order->shipment_fees }}   {{ trans('general.kd') }}|
| {{ trans('general.discount') }}      |       |    {{ $order->discount }}   {{ trans('general.kd') }}|
| {{ trans('general.net_total') }}      |       |    {{ $order->net_price }}   {{ trans("general.kd") }}|
@endcomponent

@component('mail::button', ['url' => route('frontend.home')])
{{ config('app.name') }}
@endcomponent

{{ trans('general.thanks') }},<br>
{{ config('app.name') }}
@endcomponent
</div>
