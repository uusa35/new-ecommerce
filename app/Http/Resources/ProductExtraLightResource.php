<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductExtraLightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name_ar' =>  $this->name_ar,
            'name_en' => $this->name_en,
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'active' => $this->active,
            'image' => $this->image,
            'thumb' => url(env('THUMBNAIL').$this->image),
            'sku' => $this->sku,
            'has_attributes' => $this->has_attributes && $this->variants->isNotEmpty(),
            'has_real_attributes' => $this->has_attributes,
            'isOnSale' => $this->isOnSale,
            'exclusive' => $this->exclusive,
            'on_new' => $this->on_new,
            'qty' => $this->qty,
            'description_ar' => $this->description_ar,
            'description_en' => $this->description_en,
            'user' => UserExtraLightResource::make($this->whenLoaded('user')),
//            'color' => ColorExtraLightResource::make($this->whenLoaded('color')),
//            'size' => SizeExtraLightResource::make($this->whenLoaded('size')),
//            'product_attributes' => ProductAttributeExtraLightResource::collection($this->whenLoaded('product_attributes'))
        ];
    }
}
