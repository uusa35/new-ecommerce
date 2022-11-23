<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ChartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
                'label' => Carbon::parse($this->first()->first()->created_at)->format('Y'),
                'data' => $this->map(function ($d) {
                    return round($d->sum('net_price'), 2);
                })->flatten(),
                'borderColor' => ['#bc1212','#bc1212'][rand(0, 1)],
                'backgroundColor' => ['#75bcdd','#75bcdd'][rand(0, 1)]
        ];
    }
}
