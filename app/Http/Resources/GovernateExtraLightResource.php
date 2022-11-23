<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GovernateExtraLightResource extends JsonResource
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
            'id' => $this->id,
            'name_ar' => $this->name_ar,
            'name_en' => $this->name_en,
            'country_id' => $this->country_id,
            'price' => $this->price,
            'areas' => AreaExtraLightResource::make($this->whenLoaded('areas')),
            'country' => CountryExtraLightResource::make($this->whenLoaded('country')),
        ];
    }
}
