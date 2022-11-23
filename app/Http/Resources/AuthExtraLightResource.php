<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthExtraLightResource extends JsonResource
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
            'email' => $this->email,
            'image' => $this->image,
            'verified' => $this->hasVerifiedEmail(),
            'access_dashboard' => $this->access_dashboard,
            'role' => RoleExtraLightResource::make($this->whenLoaded('role')),
            'favoritesList' => FavoriteExtraLightResource::collection($this->whenLoaded('favoritesList')),
            'orders' => OrderExtraLightResource::collection($this->whenLoaded('orders')),
            'country' => CountryExtraLightResource::make($this->whenLoaded('country')),
        ];
    }
}
