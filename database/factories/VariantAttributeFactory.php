<?php

namespace Database\Factories;

use App\Models\AttributeValue;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VariantAttribute>
 */
class VariantAttributeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'variant_id' => Variant::all()->random()->id,
            'attribute_values_id' => AttributeValue::all()->random()->id
        ];
    }
}
