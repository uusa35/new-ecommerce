<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'sku' => $this->faker->postcode,
            'name_ar' => 'دورة اونلاين ' . $fakerAr->name,
            'name_en' => 'Course '.$this->faker->name,
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->name,
            'on_new' => $this->faker->boolean(true),
            'exclusive' => $this->faker->boolean(true),
            'on_sale' => $this->faker->boolean,
            'on_home' => $this->faker->boolean,
            'is_available' => $this->faker->boolean(true),
            'price' => $this->faker->randomFloat(3, 10, 200),
            'sale_price' => function ($array) {
                return $array['price'] - rand(1, 5);
            },
            'size_chart_image' => 'sample.png',
            'description_en' => $this->faker->paragraph,
            'description_ar' => $fakerAr->paragraph,
            'notes_ar' => $fakerAr->paragraph,
            'notes_en' => $this->faker->paragraph,
            'keywords' => $this->faker->sentence,
            'image' => 'product.png',
            'qr' => 'sample.png',
            'start_sale' => $this->faker->dateTime('now'),
            'end_sale' => $this->faker->dateTimeBetween('now', '1 year'),
            'is_hot_deal' => $this->faker->boolean(true),
            'user_id' => User::active()->get()->random()->id,
            'barcode' => $this->faker->isbn13,
            'views' => $this->faker->randomNumber(),
            'file' => '01.pdf',
            'preview' => '01.pdf',
            'order' => $this->faker->numberBetween(1, 99),
            'free' => $this->faker->boolean,
            'download' => $this->faker->boolean,
        ];
    }
}
