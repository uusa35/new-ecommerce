<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\ShipmentPackage;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class ShipmentPackageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ShipmentPackage::class;

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
            'name_ar' => $this->faker->name,
            'name_en' => $this->faker->name,
            'charge' => $this->faker->randomFloat(1, 0, 9),
            'active' => $this->faker->boolean(true),
            'is_available' => $this->faker->boolean(true),
            'notes_ar' => $this->faker->paragraph,
            'notes_en' => $this->faker->paragraph,
            'image' => 'square.png',
            'country_id' => Country::all()->random()->id,
        ];
    }
}
