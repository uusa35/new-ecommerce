<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingUpdate extends FormRequest
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
            'logo.dimensions' => trans('message.best_fit', ['width' => '1024 px', 'height' => '1024 px']),
            'app_logo.dimensions' => trans('message.best_fit', ['width' => '600 px', 'height' => '210 px']),
            'menu_bg.dimensions' => trans('message.best_fit', ['width' => '1242 px', 'height' => '2688 px']),
            'main_bg.dimensions' => trans('message.best_fit', ['width' => '1242 px', 'height' => '2688 px']),
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
            'company_en' => 'nullable|min:3',
            'company_ar' => 'nullable|min:3',
            'email' => 'required|email',
            'logo' => 'image|nullable|dimensions:width=1024,max_height:1024',
            'app_logo' => 'image|nullable|dimensions:max_width:600,height=221',
            'menu_bg' => 'image|nullable|dimensions:width=1242,max_height=2688',
            'main_bg' => 'image|nullable|dimensions:width=1242,max_height=2688',
            'size_chart' => 'image|nullable|dimensions:width=1080,max_height=1440',
        ];
    }
}
