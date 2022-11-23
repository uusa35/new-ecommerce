<?php

namespace Database\Factories;

use App\Models\Fan;
use App\Models\Model;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class FanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Fan::class;

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
            'fan_id' => User::all()->random()->id,
            'product_id' => Product::all()->random()->id,
            'service_id' => Service::all()->random()->id,
        ];
    }
}
