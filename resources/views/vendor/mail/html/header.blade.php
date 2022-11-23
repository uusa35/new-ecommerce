<tr>
<td class="header">
@if (trim($slot) === 'Laravel')
<a href="{{ $url }}" style="display: inline-block;">
<img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
</a>
@else
<div style="display: inline-block; text-align: center; margin: auto;">
{{ $slot }}
</div>
@endif
</td>
</tr>
