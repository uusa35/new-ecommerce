<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Country;
use App\Models\Coupon;
use App\Models\Governate;
use App\Models\Order;
use App\Models\Model;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;


class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'user_id' => User::all()->random()->id,
            'status' => $this->faker->randomElement(['pending', 'paid', 'failed', 'delivered','completed']),
            'price' => $this->faker->numberBetween(22, 99),
            'discount' => $this->faker->numberBetween(10, 22), // discount will be updated if there is a coupon applied.
            'shipment_fees' => $this->faker->numberBetween(10, 22), // discount will be updated if there is a coupon applied.
            'net_price' => function ($array) {
                return $array['price'] - $array['discount'];
            },
            'email' => $this->faker->email,
            'address' => $this->faker->address,
            'mobile' => $this->faker->bankAccountNumber,
            'phone' => $this->faker->bankAccountNumber,
            'reference_id' => $this->faker->bankAccountNumber,
            'payment_method' => $this->faker->randomElement(['cash', 'visa', 'mastercard']),
            'country' => Country::all()->random()->name,
            'area' => $this->faker->country,
            'block' => $this->faker->numberBetween(1,10),
            'street' => $this->faker->numberBetween(1,10),
            'building' => $this->faker->numberBetween(1,10),
            'floor' => $this->faker->numberBetween(1,10),
            'apartment' => $this->faker->numberBetween(1,10),
            'coupon_id' => Coupon::all()->random()->id,
            'notes' => $this->faker->paragraph,
            'paid' => $this->faker->boolean(true),
            'shipment_reference' => $this->faker->bankAccountNumber,
            'cash_on_delivery' => $this->faker->boolean,
            'country_id' => Country::has('governates.areas')->get()->random(),
            'governate_id' => fn($array) => Governate::where(['country_id' => $array['country_id']])->first(),
            'area_id' => fn($array) => Governate::where(['id' => $array['governate_id']])->first(),
        ];
    }
}
