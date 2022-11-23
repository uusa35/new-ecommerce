<?php

namespace Database\Factories;

use App\Models\Subscription;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Subscription::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => $this->faker->name,
            'name_en' => $this->faker->name,
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'description_ar' => $fakerAr->paragraph,
            'description_en' => $this->faker->paragraph,
            'notes_ar' => $fakerAr->name,
            'notes_en' => $this->faker->name,
            'on_sale' => $this->faker->boolean,
            'is_featured' => $this->faker->boolean,
            'free' => $this->faker->boolean,
            'code' => $this->faker->colorName,
            'image' => 'square.png',
            'months' => $this->faker->numberBetween(1, 99),
            'price' => $this->faker->numberBetween(1, 99),
            'order' => $this->faker->numberBetween(1, 99),
            'sale_price' => $this->faker->numberBetween(1, 99),
        ];
    }
}
