<?php

namespace Database\Factories;

use App\Models\Slide;
use Illuminate\Database\Eloquent\Factories\Factory;

class SlideFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Slide::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'image' => 'slide.png',
            'name_en' => $this->faker->name,
            'name_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'caption_ar' => $fakerAr->name,
            'description_en' => $this->faker->name,
            'description_ar' => $fakerAr->name,
            'active' => $this->faker->boolean,
            'on_home' => $this->faker->boolean,
            'is_video' => $this->faker->boolean,
            'is_intro' => $this->faker->boolean,
            'url' => $this->faker->url,
            'order' => $this->faker->numberBetween(1, 10),
            'slidable_type' => $this->faker->randomElement(['App\Models\User', 'App\Models\Category', 'App\Models\Product', 'App\Models\Service','App\Models\Course','App\Models\Book']),
            'slidable_id' => $this->faker->numberBetween(1, 99)
        ];
    }
}
