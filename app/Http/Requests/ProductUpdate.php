<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdate extends FormRequest
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
            'image.dimensions' => trans('message.best_fit', ['width' => '1080 px', 'height' => '1440 px']),
            'qr.dimensions' => trans('message.best_fit', ['width' => '300 px', 'height' => '300 px']),
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
            'sku' => 'min:2',
            'name_ar' => 'min:3|max:200',
            'name_en' => 'min:3|max:200',
            'has_attributes' => 'boolean',
            'user_id' => 'exists:users,id',
            'shipment_package_id' => 'nullable|exists:shipment_packages,id',
            'brand_id' => 'nullable|exists:brands,id',
//            'image' => "nullable",
//            'images' => "nullable",
            'qr' => "nullable",
            'categories' => 'array',
            'price' => 'numeric|min:0.5|max:999',
            'qty' => ['numeric', 'min:1', 'max:999', 'regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/'],
            'weight' => ['between:0.1,10'],
            'order' => ['numeric','min:1','max:9999','regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/', 'nullable'],
            'on_sale' => 'boolean',
            'on_sale_on_homepage' => 'boolean',
            'on_homepage' => 'boolean',
            'sale_price' => 'numeric|nullable|min:0.5|max:999',
            'size_chart_image' => 'image|nullable',
            'description_en' => 'min:3|nullable',
            'description_ar' => 'min:3|nullable',
            'notes_ar' => 'min:3|nullable',
            'notes_en' => 'min:3|nullable',
            'size_chart_image' => 'nullable',
//            'start_sale' => 'date|nullable',
//            'end_sale' =>
            'active' => 'boolean',
            'tags' => 'array',
            'videos' => 'array',
            'video_url' => 'nullable|url',
            'video_url_one' => 'nullable|url',
            'video_url_two' => 'nullable|url',
            'color_id' => 'nullable|exists:colors,id|required_if:has_attributes,0',
            'size_id' => 'nullable|exists:sizes,id|required_if:has_attributes,0',
            'home_delivery_availability' => 'nullable|boolean'
        ];
    }
}
