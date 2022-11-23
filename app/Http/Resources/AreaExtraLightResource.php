<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AreaExtraLightResource extends JsonResource
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
            'governate_id' => $this->governate_id,
            'country_id' => $this->country_id,
            'active' => $this->active,
            'governate' => GovernateExtraLightResource::make($this->whenLoaded('governate')),
            'country' => CountryExtraLightResource::make($this->whenLoaded('country')),
        ];
    }
}
