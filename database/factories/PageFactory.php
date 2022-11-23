<?php

namespace Database\Factories;

use App\Models\Page;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class PageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Page::class;

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
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'image' => 'square.png',
            'description_ar' => $fakerAr->paragraph,
            'description_en' => $this->faker->paragraph,
            'is_url' => $this->faker->boolean,
            'url' => $this->faker->url,
            'order' => $this->faker->numberBetween(1, 10),
            'active' => $this->faker->boolean,
            'show_on_footer' => $this->faker->boolean,
            'show_on_header' => $this->faker->boolean,
        ];
    }
}
