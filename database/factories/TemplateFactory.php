<?php

namespace Database\Factories;

use App\Models\Template;
use Illuminate\Database\Eloquent\Factories\Factory;

class TemplateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Template::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['template_two','template_one','template_three','template_four','template_five','template_six']),
            'image' => 'sample.png',
            'header' => $this->faker->boolean,
            'section' => $this->faker->boolean,
        ];
    }
}
