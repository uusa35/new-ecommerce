<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Governate;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class GovernateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Governate::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'country_id' => Country::all()->random()->id,
            'name_ar' => $this->faker->name,
            'name_en' => $this->faker->name,
            'order' => $this->faker->numberBetween(1, 10),
            'active' => $this->faker->boolean(true),
            'price' => $this->faker->randomFloat(3, 1, 1.5),
        ];
    }
}
