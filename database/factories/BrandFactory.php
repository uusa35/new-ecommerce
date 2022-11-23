<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class BrandFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Brand::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name' => $this->faker->word,
            'name_ar' => $fakerAr->name,
            'name_en' => $this->faker->word,
            'image' => 'logo-0' . $this->faker->numberBetween(1, 8) . '.png',
            'on_home' => $this->faker->boolean,
            'order' => $this->faker->numberBetween(1, 10),
            'active' => $this->faker->boolean(true),
        ];
    }
}

