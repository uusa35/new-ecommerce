<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'image.dimensions' => trans('message.best_fit', ['width' => '1000 px', 'height' => '1000 px']),
            'max.gt' => trans('general.max_greater_than_min'),
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name_ar' => 'required|min:3|max:200',
            'name_en' => 'required|min:3|max:200',
            'min' => 'numeric|nullable',
            'max' => 'numeric|nullable|required_with:min|gt:min',
            'description_en' => 'min:3|nullable|max:1000',
            'description_ar' => 'min:3|nullable|max:1000',
            'caption_en' => 'min:3|nullable|max:1000',
            'caption_ar' => 'min:3|nullable|max:1000',
            'image' => "nullable|max:".env('MAX_IMAGE_SIZE').'"',
            'image_rectangle' => "nullable|max:".env('MAX_IMAGE_SIZE').'"',
            'file' => 'nullable||max:10000',
            'limited' => 'boolean|nullable',
            'order' => 'integer',
            'is_home' => 'boolean|nullable',
            'active' => 'boolean|nullable',
        ];
    }
}
