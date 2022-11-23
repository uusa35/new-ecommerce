<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\Branch;
use App\Models\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class BranchFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Branch::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => $fakerAr->name,
            'name_en' => $this->faker->name,
            'address_ar' => $fakerAr->address,
            'address_en' => $this->faker->address,
            'phone' => $this->faker->bankAccountNumber,
            'mobile' => $this->faker->bankAccountNumber,
            'description_en' => $this->faker->sentence,
            'description_ar' => $this->faker->realText(100),
            'area_id' => Area::all()->random()->id,
            'user_id' => User::all()->random()->id,
        ];
    }
}
