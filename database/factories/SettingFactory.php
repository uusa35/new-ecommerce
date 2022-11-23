<?php

namespace Database\Factories;

use App\Models\Setting;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class SettingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Setting::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => $fakerAr->name,
            'name_en' => $this->faker->name,
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'address_ar' => $fakerAr->address,
            'address_en' => $this->faker->name,
            'description_ar' => $fakerAr->name,
            'description_en' => $this->faker->name,
            'aboutus_ar' => $this->faker->paragraph,
            'aboutus_en' => $this->faker->paragraph,
            'mobile' => $this->faker->bankAccountNumber,
            'whatsapp' => $this->faker->bankAccountNumber,
            'phone' => $this->faker->bankAccountNumber,
            'country_ar' => $this->faker->country,
            'country_en' => $this->faker->country,
            'zipcode' => $this->faker->randomDigit,
            'email' => $this->faker->email,
            'android' => $this->faker->url,
            'apple' => $this->faker->url,
            'youtube' => $this->faker->url,
            'instagram' => $this->faker->url,
            'twitter' => $this->faker->url,
            'snapchat' => $this->faker->url,
            'facebook' => $this->faker->url,
            'image' => 'square.png',
            'menu_bg' => 'square.png',
            'main_bg' => 'square.png',
            'gift_image' => 'square.png',
            'app_logo' => 'square.png',
            'qr' => 'square.png',
            'shipment_prices' => 'square.png',
            'size_chart_image' => 'square.png',
            'enable_cod' => $this->faker->boolean(true),

            'default_theme' => 'light',
            'theme_light' => 'gray',
            'theme_dark' => 'gray',

            'longitude' => $this->faker->longitude,
            'latitude' => $this->faker->latitude,
            'show_commercials' => $this->faker->boolean(true),
            'splash_image' => 'square.png',
            'shipment_notes_ar' => $this->faker->name,
            'shipment_notes_en' => $this->faker->name,
            'policy_ar' => $this->faker->paragraph,
            'policy_en' => $this->faker->paragraph,
            'terms_ar' => $this->faker->paragraph,
            'terms_en' => $this->faker->paragraph,
            'gift_fee' => 5.00,
            'multi_cart_merchant' => $this->faker->boolean(true),
            'keywords' => $this->faker->paragraph,

            'font_ar' => 'font-tajwal-medium',
            'font_en' => 'font-tajwal-medium'
        ];
    }
}
