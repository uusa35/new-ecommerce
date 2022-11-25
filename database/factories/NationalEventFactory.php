<?php

namespace Database\Factories;

use App\Models\Governate;
use App\Models\Nationalevent;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
// * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Nationalevent>
 */
class NationalEventFactory extends Factory
{
    protected $model = Nationalevent::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'sku' => $this->faker->postcode,
            'active' => $this->faker->boolean(true),
            'name_ar' => ' فعالية  ' . $this->faker->numberBetween(99, 999),
            'name_en' => 'T- Event  ' . $this->faker->numberBetween(99, 999),
            'caption_ar' => 'فعالية وصف' . $this->faker->numberBetween(99, 999),
            'caption_en' => 'T- Event summary ' . $this->faker->numberBetween(99, 999),
            'url' => $this->faker->url,
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'is_paid' => $this->faker->boolean(),
            'on_new' => $this->faker->boolean(true),
            'exclusive' => $this->faker->boolean(true),
            'on_sale' => $this->faker->boolean,
            'on_home' => $this->faker->boolean,
            'is_available' => $this->faker->boolean(true),
            'direct_purchase' => $this->faker->boolean(false),
            'delivery_time' => $this->faker->numberBetween(1, 9),
            'price' => $this->faker->randomFloat(3, 10, 200),
            'sale_price' => function ($array) {
                return $array['price'] - rand(1, 5);
            },
            'description_en' => $this->faker->paragraph,
            'description_ar' => $this->faker->paragraph,
            'notes_ar' => $this->faker->paragraph,
            'notes_en' => $this->faker->paragraph,
            'keywords' => $this->faker->sentence,
            'image' => 'product.png',
            'qr' => 'square.png',
            'start_sale' => $this->faker->dateTime('now'),
            'end_sale' => $this->faker->dateTimeBetween('now', '1 year'),
            'is_hot_deal' => $this->faker->boolean(true),
            'user_id' => User::active()->get()->random()->id,
            'governate_id' => Governate::active()->get()->random()->id,
            'barcode' => $this->faker->isbn13,
            'views' => $this->faker->randomNumber(),
            'order' => $this->faker->numberBetween(1, 99),
            'file' => '01.pdf',
            'start_date' => $this->faker->dateTime('now'),
            'end_date' => $this->faker->dateTimeBetween('now', '1 year'),
            'from' => $this->faker->dateTimeBetween('now', '1 month'),
            'to' => $this->faker->dateTimeBetween('now', '1 year'),
        ];
    }
}
