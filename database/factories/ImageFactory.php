<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Image;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class ImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Image::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'imagable_id' => $this->faker->numberBetween(1, 60),
            'imagable_type' => $this->faker->randomElement([
                'App\Models\User',
                'App\Models\Product',
                'App\Models\Service', 'App\Models\Book']),
            'image' => 'product.png',
            'caption_en' => $this->faker->word,
            'caption_ar' => $fakerAr->name,
            'keywords' => $this->faker->sentence,
            'name_ar' => $this->faker->sentence,
            'name_en' => $this->faker->realText(20),
            'notes' => $this->faker->sentence,
            'order' => $this->faker->numberBetween(1, 10),
        ];
    }
}
