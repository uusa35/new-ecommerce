<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Currency;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class CurrencyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Currency::class;

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
            'country_id' => Country::doesntHave('currency')->first()->id,
            'currency_symbol_ar' => function ($array) {
                return Country::whereId($array['country_id'])->first()->currency_symbol_ar;
            },
            'currency_symbol_en' => function ($array) {
                return Country::whereId($array['country_id'])->first()->currency_symbol_en;
            },
            'active' => $this->faker->boolean(true),
            'exchange_rate' => $this->faker->numberBetween(1, 8),
            'order' => $this->faker->randomDigit,
        ];
    }
}
