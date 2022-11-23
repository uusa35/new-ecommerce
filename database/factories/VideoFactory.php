<?php

namespace Database\Factories;

use App\Models\Video;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class VideoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Video::class;

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
            'caption_en' => $this->faker->name,
            'caption_ar' => $fakerAr->name,
            'active' => $this->faker->boolean,
            'on_home' => $this->faker->boolean,
            'url' => 'https://www.youtube.com/embed/KTkClkW0MZw',
            'youtube_video_id' => 'KTkClkW0MZw',
            'image' => 'sample.png',
            'order' => $this->faker->numberBetween(1, 10),
        ];
    }
}
