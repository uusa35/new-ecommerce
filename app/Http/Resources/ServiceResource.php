<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name_ar' => $this->name_ar,
            'name_en' => $this->name_en,
            'caption_ar' => $this->caption_ar,
            'caption_en' => $this->caption_en,
            'description_ar' => $this->description_ar,
            'description_en' => $this->description_en,
            'notes_ar' => $this->notes_ar,
            'notes_en' => $this->notes_en,
            'price' =>  $this->price,
            'sale_price' => $this->sale_price,
            'image' => $this->image,
            'sku' => $this->sku,
            'on_new' => $this->on_new,
            'free' => $this->free,
            'isOnSale' => $this->isOnSale,
            'exclusive' => $this->exclusive,
            'direct_purchase' => $this->direct_purchase,
            'is_available' => $this->is_available,
            'user' => UserResource::make($this->whenLoaded('user')),
            'images' => ImageExtraLightResource::collection($this->whenLoaded('images')),
            'timings' => TimingExtraLightResource::collection($this->whenLoaded('timings')),
            'ratings' => RatingExtraLightResource::collection($this->whenLoaded('ratings')),
            'categories' => CategoryExtraLightResource::collection($this->whenLoaded('categories'))
        ];
    }
}
