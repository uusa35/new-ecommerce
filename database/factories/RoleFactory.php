<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class RoleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Role::class;

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
            'name_ar' => $this->faker->sentence,
            'name_en' => $this->faker->sentence,
            'caption_ar' => $this->faker->sentence,
            'caption_en' => $this->faker->sentence,
            'is_admin' => $this->faker->boolean(false),
            'is_super' => $this->faker->boolean(false),
            'is_client' => $this->faker->boolean(false),
            'is_designer' => $this->faker->boolean(false),
            'is_company' => $this->faker->boolean(false),
            'is_celebrity' => $this->faker->boolean(false),
            'is_visible' => $this->faker->boolean(false),
            'is_driver' => $this->faker->boolean(false),
            'active' => $this->faker->boolean(true),
            'color' => $this->faker->colorName,
            'order' => $this->faker->numberBetween(1, 10),
            'image' => 'square.png',
        ];
    }
}
