<?php

use App\Models\Country;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class CommercialFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Country::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => $this->faker->country,
            'name_en' => $this->faker->name,
            'country_code' => $this->faker->countryISOAlpha3,
            'image' => 'square.png',
            'order' => $this->faker->numberBetween(1, 40),
            'minimum_shipment_charge' => $this->faker->numberBetween(1, 5),
            'fixed_shipment_charge' => $this->faker->numberBetween(1, 10),
            'is_local' => $this->faker->boolean(true),
            'calling_code' => '00965',
            'has_currency' => $this->faker->boolean,
            'longitude' => $this->faker->longitude,
            'latitude' => $this->faker->latitude,
        ];
    }
}
