<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

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
            'active' => $this->faker->boolean(true),
            'name_ar' => 'كتاب ' . $fakerAr->name,
            'name_en' => 'Book' . $this->faker->numberBetween(1, 999),
            'caption_ar' => 'كتاب ' . $fakerAr->name,
            'caption_en' => 'Book' . $this->faker->numberBetween(1, 999),
            'weight' => $this->faker->randomDigit,
            'home_delivery_availability' => $this->faker->boolean,
            'shipment_availability' => $this->faker->boolean,
            'on_new' => $this->faker->boolean(true),
            'exclusive' => $this->faker->boolean(true),
            'on_sale' => $this->faker->boolean,
            'on_home' => $this->faker->boolean,
            'is_available' => $this->faker->boolean(true),
            'direct_purchase' => $this->faker->boolean(false),
            'delivery_time' => $this->faker->numberBetween(1, 9),
            'price' => $this->faker->randomFloat(3, 10, 200),
            'sale_price' => function ($array) {
                return $array['price'] - rand(1, 5);
            },
            'description_en' => 'Book' . $this->faker->paragraph,
            'description_ar' => 'كتاب ' .$this->faker->paragraph,
            'notes_ar' => 'كتاب ' .$this->faker->paragraph,
            'notes_en' => 'Book' . $this->faker->paragraph,
            'keywords' => $this->faker->sentence,
            'image' => 'product.png',
            'qr' => 'sample.png',
            'start_sale' => $this->faker->dateTime('now'),
            'end_sale' => $this->faker->dateTimeBetween('now', '1 year'),
            'check_stock' => $this->faker->boolean(true),
            'is_hot_deal' => $this->faker->boolean(true),
            'user_id' => User::active()->get()->random()->id,
            'qty' => $this->faker->numberBetween(1, 99),
            'barcode' => $this->faker->isbn13,
            'views' => $this->faker->randomNumber(),
            'wrap_as_gift' => $this->faker->boolean(true),
            'order' => $this->faker->numberBetween(1, 99),
            'file' => '01.pdf',
            'preview' => '01.pdf',
            'free' => $this->faker->boolean,
            'download' => $this->faker->boolean,
        ];
    }
}
