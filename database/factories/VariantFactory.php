<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Variant>
 */
class VariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'product_id' => Product::all()->random()->id,
            'price' => $this->faker->randomFloat(3, 10, 200),
            'sale_price' => function ($array) {
                return $array['price'] - $this->faker->numberBetween(5, 10);
            },
            'on_sale' => $this->faker->boolean(),
            'qty' => $this->faker->numberBetween(10, 99),
            'sku' => $this->faker->postcode,
            'qr' => 'square.png',
            'image' => 'product.png',
        ];
    }
}
