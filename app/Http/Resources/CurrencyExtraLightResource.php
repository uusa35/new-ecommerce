<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyExtraLightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name_ar' => $this->name_ar,
            'name_en' => $this->name_en,
            'currency_symbol_ar' => $this->currency_symbol_ar,
            'currency_symbol_en' => $this->currency_symbol_en,
            'exchange_rate' => $this->exchange_rate,
            'image' => $this->image,
            'country' => CountryExtraLightResource::make($this->whenLoaded('country'))
        ];
    }
}
