<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleExtraLightResource extends JsonResource
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
            'is_admin' => $this->is_admin,
            'is_super' => $this->is_super,
            'is_author' => $this->is_author,
            'is_company' => $this->is_company,
            'privileges' => PrivilegeLightResource::collection($this->whenLoaded('privileges')),
        ];
    }
}
