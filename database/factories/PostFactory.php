<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

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
            'description_ar' => $this->faker->paragraph,
            'description_en' => $fakerAr->name,
            'order' => $this->faker->numberBetween(1, 10),
            'active' => $this->faker->boolean,
            'user_id' => User::active()->get()->random()->id,
            'video_url' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'keywords' => $this->faker->sentence,
            'views' => $this->faker->randomNumber(),
        ];
    }
}
