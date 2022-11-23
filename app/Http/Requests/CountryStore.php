<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CountryStore extends FormRequest
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
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:countries,name',
            'slug_ar' => 'required|unique:countries,slug_ar',
            'slug_en' => 'required|unique:countries,slug_en',
            'calling_code' => 'required|unique:countries,calling_code',
            'country_code' => 'required|alpha|unique:countries,country_code',
            'order' => 'required|numeric|max:99|min:1',
            'fixed_shipment_charge' => 'required|between:0,99.99',
            'image' => 'required|image',
            'packages' => 'array'
        ];
    }
}
