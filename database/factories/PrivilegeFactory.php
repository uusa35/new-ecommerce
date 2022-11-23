<?php

namespace Database\Factories;

use App\Models\Privilege;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class PrivilegeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Privilege::class;

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
            'name_ar' => $fakerAr->name,
            'name_en' => $this->faker->name,
            'image' => 'square.png',
            'description_ar' => $this->faker->name,
            'description_en' => $this->faker->name,
            'order' => $this->faker->numberBetween(1, 99),
            'on_top' => $this->faker->boolean,
            'hide_module' => $this->faker->boolean,
        ];
    }
}
