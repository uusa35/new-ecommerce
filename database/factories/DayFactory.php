<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Day;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class DayFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Day::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'day' => $this->faker->dayOfMonth,
            'day_name_ar' => $this->faker->dayOfMonth,
            'day_name_en' => $this->faker->dayOfMonth,
            'day_no' => $this->faker->numberBetween(0, 6)
        ];
    }
}
