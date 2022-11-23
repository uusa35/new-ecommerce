<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ChartCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'title'  => trans("general.sales") .' '.' ('. trans('general.kd') .') ',
            'data' => [
                'labels' => $this->collection->map(fn($r) => $r->pluck('month'))->flatten()->unique()->toArray(),
//                'labels' => ['Jan','Feb','Mar', 'Apr','May'],
                'datasets' => [ChartResource::make($this->collection)]
            ]
        ];
    }
}
