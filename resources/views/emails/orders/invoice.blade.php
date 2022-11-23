<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('/js/app.js') }}" defer></script>
</head>
<body>
<div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}"
     style="font-weight: bolder; text-align:  {{ app()->getLocale() === 'ar' ? 'right' : 'left' }} !important;">
    <div class="min-h-screen mx-auto max-w-6xl border-2 mt-10 rounded-md">
        <div dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}"
             style="font-weight: bolder; text-align:  {{ app()->getLocale() === 'ar' ? 'right' : 'left' }} !important;">

            <div class="flex flex-col justify-center items-center mt-5 mb-3"
                 style="width : 100%; border: 2px solid red;
                 display: flex;
                 margin: auto;
                 justify-items: center;
                 align-items: center"
            >
                <img
                    class="w-20 h-20 object-cover"
                    style="max-height: 50px;"
                    src="data:image/png;base64,{{ base64_encode(file_get_contents(asset(env('LARGE') . $settings->image))) }}" alt="" />
            </div>

            <div class="flex flex-col justify-center items-start bg-gray-100 rounded-md shadow-md m-3 p-3">
                <div>
                    {{ trans('general.invoice_no') }} : {{ $order->id }}
                </div>
                <div>
                    {{ trans('general.username') }} : {{ $order->user->name_ar }} - {{ $order->user->name_en }}
                </div>
                <div>
                    {{ trans('general.email') }} : {{ $order->user->email }}
                </div>
                <div>
                    {{ trans('general.mobile') }} : {{ $order->user->mobile }}
                </div>
            </div>


            <table>
                <thead>
                <th>{{ trans('general.id') }}</th>
                </thead>
                | {{ trans('general.id') }} | {{ trans('general.name') }} | {{ trans('general.type') }} |
                | ------------- |:-------------:| --------:|
                @foreach($order->order_metas as $meta)
                    | {{ ($loop->index+1) }}      | {{ $meta->name }}
                    |    {{ ucfirst($meta->ordermetable()->first()->type) }}   |
                    @if($meta->ordermetable()->first()->type === 'product')
                        | | {{ trans('general.color') }} : {{ $meta->color }}| |
                        | | {{ trans('general.size') }} : {{ $meta->size }}| |
                        | | {{ trans('general.notes') }} : {{ $meta->notes }}| |
                    @endif
                    @if($meta->ordermetable()->first()->type === 'service')
                        | | {{ trans('genreal.booked_at') }} : {{ $meta->booked_at }}| |
                        | | {{ trans('general.time') }} : {{ $meta->time }}| |
                        | | {{ trans('general.notes') }} : {{ $meta->notes }}| |
                    @endif
                @endforeach
            </table>
            >


            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <h1 class="text-xl font-semibold text-gray-900">Invoice</h1>
                        <p class="mt-2 text-sm text-gray-700">For work completed from
                            <time datetime="2022-08-01">August 1, 2022</time>
                            to
                            <time datetime="2022-08-31">August 31, 2022</time>
                            .
                        </p>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button type="button"
                                class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                            Print
                        </button>
                    </div>
                </div>
                <div class="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col"
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">
                                Project
                            </th>
                            <th scope="col"
                                class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell">
                                Hours
                            </th>
                            <th scope="col"
                                class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell">
                                Rate
                            </th>
                            <th scope="col"
                                class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                                Price
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="border-b border-gray-200">
                            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                <div class="font-medium text-gray-900">New Advertising Campaign</div>
                                <div class="mt-0.5 text-gray-500 sm:hidden">12.0 hours at $75.00</div>
                            </td>
                            <td class="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">12.0</td>
                            <td class="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">$75.00</td>
                            <td class="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">$900.00</td>
                        </tr>

                        <!-- More projects... -->
                        </tbody>
                        <tfoot>
                        <tr>
                            <th scope="row" colspan="3"
                                class="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0">
                                Subtotal
                            </th>
                            <th scope="row"
                                class="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal
                            </th>
                            <td class="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">$3,900.00</td>
                        </tr>
                        <tr>
                            <th scope="row" colspan="3"
                                class="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0">
                                Tax
                            </th>
                            <th scope="row"
                                class="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax
                            </th>
                            <td class="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">$585.00</td>
                        </tr>
                        <tr>
                            <th scope="row" colspan="3"
                                class="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0">
                                Total
                            </th>
                            <th scope="row"
                                class="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total
                            </th>
                            <td class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                                $4,485.00
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>


        </div>
    </div>
</div>
</body>
</html>
