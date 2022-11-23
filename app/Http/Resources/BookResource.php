<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BookResource extends JsonResource
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
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'image' => $this->image,
            'sku' => $this->sku,
            'on_new' => $this->on_new,
            'isOnSale' => $this->isOnSale,
            'exclusive' => $this->exclusive,
            'free' => $this->free,
            'download' => $this->download,
            'embedded' => $this->embedded,
            'file' => Storage::disk('public')->exists('uploads/files/' . $this->file) && $this->file ? $this->file : null,
            'is_available' => $this->is_available,
            'direct_purchase' => $this->direct_purchase,
            'user' => UserResource::make($this->whenLoaded('user')),
            'images' => ImageExtraLightResource::collection($this->whenLoaded('images')),
        ];
    }
}
