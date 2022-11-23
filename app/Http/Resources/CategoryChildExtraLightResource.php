<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryChildExtraLightResource extends JsonResource
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
            'image' => $this->image,
            'active' => $this->active,
            'is_book' => $this->is_book,
            'is_product' => $this->is_product,
            'is_course' => $this->is_course,
            'is_featured' => $this->is_featured,
            'is_service' => $this->is_service,
            'on_home' => $this->on_home,
            'children' => CategoryExtraLightResource::collection($this->whenLoaded('children')),
        ];
    }
}
