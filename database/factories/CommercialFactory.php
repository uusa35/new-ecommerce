<?php

namespace Database\Factories;

use App\Models\Commercial;
use App\Models\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class CommercialFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Commercial::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name_ar' => $this->faker->name,
            'name_en' => $this->faker->name,
            'is_double' => $this->faker->boolean,
            'is_triple' => $this->faker->boolean,
            'caption_ar' => $this->faker->name,
            'caption_en' => $this->faker->name,
            'image' => app()->isLocal() ? 'commercial-0' . $this->faker->numberBetween(1, 3) . '.jpeg' : $this->faker->numberBetween(43, 49) . '.jpeg', // 800 x 225
            'url' => $this->faker->url,
            'file' => '1.pdf',
            'order' => $this->faker->numberBetween(1, 99),
            'active' => $this->faker->boolean(true),
            'on_home' => $this->faker->boolean(true),
            'order' => $this->faker->numberBetween(1, 59),
            'user_id' => User::active()->get()->random()->id,
            'website' => $this->faker->url,
            'facebook' => $this->faker->url,
            'instagram' => $this->faker->url,
            'youtube' => $this->faker->url,
            'twitter' => $this->faker->url,
            'whatsapp' => $this->faker->bankAccountNumber,
        ];
    }
}
