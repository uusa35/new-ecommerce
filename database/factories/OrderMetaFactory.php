<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\Book;
use App\Models\Color;
use App\Models\Country;
use App\Models\Course;
use App\Models\Nationalevent;
use App\Models\Order;
use App\Models\OrderMeta;
use App\Models\Model;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Service;
use App\Models\Size;
use App\Models\Timing;
use App\Models\User;
use App\Models\Variant;
use App\Models\VariantAttribute;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;


class OrderMetaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = OrderMeta::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->paragraph,
            'order_id' => Order::all()->random()->id,
            'qty' => $this->faker->numberBetween(1, 3),
            'price' => $this->faker->numberBetween(10,99),
            'shipment_cost' => $this->faker->numberBetween(1, 3),
            'wrap_as_gift' => $this->faker->boolean,
            'booked_at' => Carbon::now()->addDays($this->faker->numberBetween(1, 9)),
            'time' => function ($array) {
                return Carbon::parse(($array['booked_at']))->format('h:i:s');
            },
            'timing_id' => Timing::all()->random()->id,
            'variant_attribute_id' => VariantAttribute::all()->random()->id,
            'ordermetable_type' => $this->faker->randomElement([Product::class, Book::class, Course::class, Service::class, Nationalevent::class]),
            'ordermetable_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
