<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Area;
use App\Models\Country;
use App\Models\Governate;
use App\Models\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class AddressFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Address::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name' => $this->faker->name,
            'content' => $this->faker->name,
            'area' => $this->faker->name,
            'block' => $this->faker->numberBetween(0, 10),
            'street' => $this->faker->numberBetween(0, 10),
            'building' => $this->faker->numberBetween(0, 10),
            'floor' => $this->faker->numberBetween(0, 10),
            'apartment' => $this->faker->numberBetween(0, 10),
            'country_name' => $this->faker->country,
            'user_id' => User::all()->random()->id,
            'country_id' => Country::first()->id,
            'governate_id' => function ($array) {
                return Governate::whereId($array['country_id'])->get()->random()->id;
            },
            'area_id' => function ($array) {
                return Area::whereId($array['governate_id'])->get()->random()->id;
            }
        ];
    }
}
