<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryExtraLightResource extends JsonResource
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
            'description_ar' => $this->description_ar,
            'description_en' => $this->description_en,
            'image' => $this->image,
            'active' => $this->active,
            'is_book' => $this->is_book,
            'is_product' => $this->is_product,
            'is_course' => $this->is_course,
            'is_service' => $this->is_service,
            'is_user' => $this->is_user,
            'is_featured' => $this->is_featured,
            'parent_id' => $this->parent_id,
            'is_parent' => $this->is_parent,
            'on_home' => $this->on_home,
            'children' => CategoryChildExtraLightResource::collection($this->whenLoaded('children')),
            'products' => ProductExtraLightResource::collection($this->whenLoaded('products'))
        ];
    }
}
