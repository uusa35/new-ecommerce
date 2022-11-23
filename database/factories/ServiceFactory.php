<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Brand;
use App\Models\Color;
use App\Models\Service;
use App\Models\Model;
use App\Models\ShipmentPackage;
use App\Models\Size;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class ServiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Service::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'sku' => $this->faker->postcode,
            'name_ar' => 'استشارة وخدمة ' .$fakerAr->name,
            'name_en' => 'Service '.$this->faker->name,
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'on_sale' => $this->faker->boolean(true),
            'exclusive' => $this->faker->boolean(true),
            'on_home' => $this->faker->boolean(true),
            'on_new' => $this->faker->boolean(true),
            'duration' => $this->faker->numberBetween(1, 9),
            'individuals' => $this->faker->numberBetween(10, 40),
            'setup_time' => $this->faker->numberBetween(1, 9),
            'delivery_time' => $this->faker->numberBetween(1, 9),
            'price' => $this->faker->randomFloat(3, 10, 200),
            'sale_price' => function ($array) {
                return $array['price'] - rand(1, 5);
            },
            'description_en' => $this->faker->name,
            'description_ar' => $fakerAr->name,
            'notes_ar' => $fakerAr->name,
            'notes_en' => $this->faker->name,
            'keywords' => $this->faker->name,
            'image' => 'product.png',
            'is_hot_deal' => $this->faker->boolean(true),
            'start_sale' => $this->faker->dateTime('now'),
            'start_date' => $this->faker->dateTime('now'),
            'range' => $this->faker->numberBetween(1, 6),
            'end_sale' => $this->faker->dateTimeBetween('now', '1 year'),
            'user_id' => User::all()->random()->id,
            'active' => $this->faker->boolean(true),
            'is_available' => $this->faker->boolean(true),
            'multi_booking' => $this->faker->boolean,
            'booking_limit' => $this->faker->numberBetween(1, 4),
            'views' => $this->faker->randomNumber(),
            'has_addons' => $this->faker->boolean(),
            'has_only_items' => $this->faker->boolean(),
            'force_original_price' => $this->faker->boolean(),
            'is_package' => $this->faker->boolean(),
            'order' => $this->faker->numberBetween(1, 99),
        ];
    }
}
