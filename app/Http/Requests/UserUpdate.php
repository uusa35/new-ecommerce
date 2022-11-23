<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdate extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $userId = last(request()->segments());
        return [
            'name' => 'required|min:3|max:200',
            'name_ar' => 'required|min:3|max:200',
            'name_en' => 'required|min:3|max:200',
            'description_ar' => 'nullable|min:3|max:999',
            'description_en' => 'nullable|min:3|max:999',
            'service_ar' => 'nullable|min:3|max:999',
            'service_en' => 'nullable|min:3|max:999',
            'policy_ar' => 'nullable|min:3|max:999',
            'policy_en' => 'nullable|min:3|max:999',
            'cancellation_ar' => 'nullable|min:3|max:999',
            'cancellation_en' => 'nullable|min:3|max:999',

            'email' => 'required|min:5|max:80|unique:users,email,'.$userId,
//            'password' => 'string|min:3|max:999',
            'mobile' => ['nullable','regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/','max:12'],
            'phone' => 'nullable|max:12',
            'fax' => 'nullable|max:12',

//            'image' => 'image',
//            'bg' => 'nullable|image',


            'address' => 'nullable|min:3|max:999',
            'area_name' => 'nullable|string',
            'block' => 'nullable|string',
            'street' => 'nullable|max:100',
            'building' => 'nullable|max:100',
            'floor' => 'nullable|max:100',
            'apartment' => 'nullable|max:100',
            'country_name' => 'nullable|max:100',

            'keywords' => 'nullable|max:500',
            'qr' => 'nullable|max:500',

            'file' => 'nullable',
            'website' => 'nullable|url',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'youtube' => 'nullable|url',
            'twitter' => 'nullable|url',
            'whatsapp' => ['nullable','regex:/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/','max:11'],
            'iphone' => 'nullable|url',
            'android' => 'nullable|url',
            'longitude' => 'nullable|max:100',
            'latitude' => 'nullable|max:100',
            'balance' => 'nullable|numeric',
            'player_id' => 'nullable|numeric',
            'video_url_one' => 'url|nullable|max:99',
            'video_url_two' => 'url|nullable|max:99',
            'video_url_three' => 'url|nullable|max:99',
            'video_url_four' => 'url|nullable|max:99',
            'video_url_five' => 'url|nullable|max:99',
            'order' => 'nullable|integer|min:1|max:999',
            'custome_delivery_fees' => 'nullable|numeric',

            'on_home' => 'nullable|boolean',
            'active' => 'nullable|boolean',

            'country_id' => 'required|numeric|exists:countries,id',
            'governate_id' => 'required|numeric|exists:governates,id',
            'area_id' => 'required|numeric|exists:areas,id',
            'role_id' => 'required|numeric|exists:roles,id',
            'subscription_id' => 'numeric|exists:subscriptions,id',
            'merchant_id' => 'nullable|max:200|min:3',
            'categories' => 'array'
        ];
    }
}
