<?php

namespace Database\Factories;

use App\Models\Tag;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class TagFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Tag::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name' => $this->faker->word,
            'name_ar' => $this->faker->word,
            'name_en' => $this->faker->word,
            'order' => $this->faker->numberBetween(1, 59),
            'image' => 'sample.png'
        ];
    }
}
