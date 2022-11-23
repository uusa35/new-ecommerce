<?php

namespace Database\Factories;

use App\Models\Newsletter;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class NewsletterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Newsletter::class;

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
            'email' => $this->faker->email,
            'active' => $this->faker->boolean,
        ];
    }
}
