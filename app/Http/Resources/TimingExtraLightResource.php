<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TimingExtraLightResource extends JsonResource
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
          'date' => $this->date,
          'start' => $this->start,
          'end' => $this->end,
          'notes_ar' => $this->notes_ar,
          'notes_en' => $this->notes_en,
          'allow_multi_select' => $this->allow_multi_select,
        ];
    }
}
