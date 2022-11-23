<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Faq;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class FaqFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var array
     */
    protected $model = Faq::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_en' => $this->faker->name,
            'name_ar' => $fakerAr->name,
            'description_en' => $this->faker->paragraph,
            'description_ar' => $fakerAr->name,
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'notes_ar' => $this->faker->name,
            'notes_en' => $fakerAr->name,
            'order' => $this->faker->numberBetween(1, 99),
        ];
    }
}
