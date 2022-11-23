<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseExtraLightResource extends JsonResource
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
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'active' => $this->active,
            'image' => $this->image,
            'sku' => $this->sku,
            'on_sale' => $this->on_sale,
            'on_new' => $this->on_new,
            'isOnSale' => $this->isOnSale,
            'exclusive' => $this->exclusive,
            'free' => $this->free,
            'active' => $this->active,
            'user' => UserExtraLightResource::make($this->whenLoaded('user'))
        ];
    }
}
