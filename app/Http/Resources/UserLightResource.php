<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserLightResource extends JsonResource {
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
            'email' => $this->email,
            'mobile' => $this->mobile,
            'whatsapp' => $this->whatsapp,
            'caption_ar' => $this->caption_ar,
            'caption_en' => $this->caption_en,
            'description_ar' => $this->description_ar,
            'description_en' => $this->description_en,
            'active' => $this->active,
            'image' => $this->image,
//            'enable_receive_from_shop' => $this->enable_receive_from_shop,
            'role' => RoleExtraLightResource::make($this->whenLoaded('role')),
        ];
    }
}
