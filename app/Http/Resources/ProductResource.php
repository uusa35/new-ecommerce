<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'notes_ar' => $this->notes_ar,
            'notes_en' => $this->notes_en,
            'description_ar' => $this->description_ar,
            'description_en' => $this->description_en,
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'image' => $this->image,
            'thumb' => url(env('THUMBNAIL').$this->image),
            'size_chart_image' => $this->size_chart_image,
            'show_size_chart' => $this->show_size_chart,
            'sku' => $this->sku,
            'on_new' => $this->on_new,
            'isOnSale' => $this->isOnSale,
            'exclusive' => $this->exclusive,
            'free' => $this->free,
            'download' => $this->download,
            'embedded' => $this->embedded,
            'file' => $this->file,
            'is_available' => $this->is_available,
            'video_url_one' => $this->video_url_one,
            'has_attributes' => $this->has_attributes && $this->variants->isNotEmpty(),
            'show_attribute' => $this->show_attribute,
            'direct_purchase' => $this->direct_purchase,
            'qty' => $this->qty,
            'user' => UserResource::make($this->whenLoaded('user')),
            'images' => ImageLightResource::collection($this->whenLoaded('images')),
            'categories' => CategoryExtraLightResource::collection($this->whenLoaded('categories')),
        ];
    }
}
