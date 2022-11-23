<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceStore extends FormRequest
{
    /**Ser
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'image.dimensions' => trans('message.best_fit', ['width' => '1080 px', 'height' => '1440 px']),
            'qr.dimensions' => trans('message.best_fit', ['width' => '300 px', 'height' => '300px']),
            'size_chart.dimensions' => trans('message.best_fit', ['width' => '1080 px', 'height' => '1440 px']),
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
            'sku' => 'required|min:2|max:20',
            'name_ar' => 'required:min:3|max:200',
            'name_en' => 'required|min:3|max:200',
            'user_id' => 'required|exists:users,id',
            'image' => "image|required",
            'qr' => "image|nullable",
            'images' => 'array|nullable',
            'categories' => 'required|array|min:1',
            'price' => 'required|numeric|min:0.5|max:999',
            'order' => ['numeric','min:1','max:9999','regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/','nullable'],
            'on_sale' => 'boolean',
            'on_homepage' => 'boolean',
            'sale_price' => 'numeric|nullable|min:0.5|max:999',
            'description_en' => 'min:3|nullable',
            'description_ar' => 'min:3|nullable',
            'notes_ar' => 'min:3|nullable',
            'notes_en' => 'min:3|nullable',
//            'start_sale' => 'date|nullable',
//            'end_sale' => 'required',
//            'active' => 'required|boolean',
            'tags' => 'array',
            'videos' => 'array',
            'video_url' => 'nullable|url',
            'video_url_one' => 'nullable|url',
            'video_url_two' => 'nullable|url',
            'video_url_three' => 'nullable|url',
            'video_url_four' => 'nullable|url',
            'video_url_five' => 'nullable|url',
            'home_delivery_availability' => 'nullable|boolean',
        ];
    }
}
