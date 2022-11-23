<?php

namespace Database\Factories;

use App\Models\Page;
use App\Models\Post;
use App\Models\Section;
use App\Models\Template;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Section::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => $fakerAr->name(),
            'name_en' => $this->faker->name,
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'description_ar' => $this->faker->paragraph(),
            'description_en' => $fakerAr->paragraph(),
            'image' => 'square.png',
            'video_url' => $this->faker->url,
            'btn_url' => $this->faker->url,
            'wide_screen' => $this->faker->boolean,
            'order' => $this->faker->randomDigit,
            'sectionable_type' => $this->faker->randomElement([Post::class, Page::class]),
            'sectionable_id' => $this->faker->numberBetween(1,10)
        ];
    }
}
