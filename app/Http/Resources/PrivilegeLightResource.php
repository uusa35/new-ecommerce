<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PrivilegeLightResource extends JsonResource
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
            'index' => $this->pivot->index,
            'create' => $this->pivot->create,
            'main_menu' => $this->main_menu,
            'on_top' => $this->on_top,
            'hide_module' => $this->hide_module,
            'image' => $this->image,
        ];
    }
}
