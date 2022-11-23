<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SettingExtraLightResource extends JsonResource
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
            'image' => $this->image,
            'twitter' => $this->twitter,
            'facebook' => $this->facebook,
            'instagram' => $this->instagram,
            'caption_ar' => $this->caption_ar,
            'caption_en' => $this->caption_en,
            'description_ar' => $this->description_ar,
            'description_en' => $this->description_en,
            'address_ar' => $this->address_ar,
            'address_en' => $this->address_en,
            'mobile' => $this->mobile,
            'country_ar' => $this->country_ar,
            'country_en' => $this->country_en,
            'whatsapp' => $this->whatsapp,
            'apple' => $this->apple,
            'android' => $this->android,
            'youtube' => $this->youtube,
            'email' => $this->email,
            'theme' => $this->theme,
            'multi_cart_merchant' => $this->multi_cart_merchant,
            'apply_global_shipment' => $this->apply_global_shipment
        ];
    }
}
