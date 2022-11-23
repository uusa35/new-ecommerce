<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Favorite;
use App\Models\Model;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class FavoriteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Favorite::class;

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
            'favoritable_type' => $this->faker->randomElement(['App\Models\User', 'App\Models\Product', 'App\Models\Service','App\Models\Course','App\Models\Book']),
            'favoritable_id' => $this->faker->numberBetween(1, 99)
        ];
    }
}

