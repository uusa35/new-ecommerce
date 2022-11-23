<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Alert;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class AlertFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Alert::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'title' => $this->faker->name,
            'description' => $this->faker->name,
            'type' => class_basename(Product::class),
            'file' => '01.pdf',
            'url' => $this->faker->imageUrl(),
            'image' => 'sample.png',
            'alertable_id' => $this->faker->numberBetween(1, 50),
            'alertable_type' => Product::class,
        ];
    }
}
