<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\Country;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class AreaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Area::class;

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
            'name_ar' => $fakerAr->name,
            'name_en' => $this->faker->name,
            'country_id' => Country::all()->random()->id,
            'longitude' => $this->faker->longitude,
            'latitude' => $this->faker->latitude,
            'order' => $this->faker->numberBetween(1, 40),
        ];
    }
}

