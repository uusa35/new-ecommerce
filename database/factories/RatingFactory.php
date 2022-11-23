<?php

namespace Database\Factories;

use App\Models\Model;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class RatingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Rating::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'user_id' => User::all()->random()->id,
            'ratingable_type' => $this->faker->randomElement(['App\Models\User', 'App\Models\Product', 'App\Models\Service','App\Models\Course','App\Models\Book']),
            'ratingable_id' => $this->faker->numberBetween(1, 99),
            'value' => $this->faker->randomElement([20, 40, 60, 80, 100]),
        ];
    }
}

