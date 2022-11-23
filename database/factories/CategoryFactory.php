<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;


class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => 'تصنيف ' . $fakerAr->firstName,
            'name_en' => 'category ' . $this->faker->firstName,
            'caption_ar' => $fakerAr->name,
            'caption_en' => $this->faker->paragraph,
            'order' => $this->faker->numberBetween(1, 99),
            'description_en' => $this->faker->paragraph(1),
            'description_ar' => $fakerAr->streetAddress,
            'image' => 'square.png',
            'image_rectangle' => 'rectangle.png',
            'file' => '01.pdf',
            'limited' => $this->faker->numberBetween(0, 1),
            'parent_id' => Category::where('parent_id', 0)->pluck('id')->shuffle()->first(),
            'on_home' => $this->faker->boolean(),
            'on_new' => $this->faker->boolean(),
            'is_featured' => $this->faker->boolean(),
            'is_service' => $this->faker->boolean(),
            'is_product' => $this->faker->boolean(),
            'is_user' => $this->faker->boolean(),
            'is_commercial' => $this->faker->boolean(),
            'is_course' => $this->faker->boolean(),
            'is_book' => $this->faker->boolean(),
            'is_national_event' => $this->faker->boolean(),
            'icon' => 'square.png',
            'min' => $this->faker->numberBetween(0, 10),
            'max' => $this->faker->numberBetween(1000, 99999),
        ];
    }
}
