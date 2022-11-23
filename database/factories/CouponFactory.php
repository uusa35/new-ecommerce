<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Coupon;
use App\Models\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class CouponFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Coupon::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'value' => $this->faker->numberBetween(1, 10),
            'is_percentage' => $this->faker->boolean,
            'is_permanent' => $this->faker->boolean,
            'consumed' => $this->faker->boolean,
            'code' => $this->faker->numberBetween(999999, 99999999999),
            'minimum_charge' => $this->faker->randomDigit,
            'due_date' => $this->faker->dateTimeBetween('now', '1 year'),
            'active' => $this->faker->boolean(true),
            'user_id' => User::all()->random()->id
        ];
    }
}
