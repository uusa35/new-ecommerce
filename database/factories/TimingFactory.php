<?php

namespace Database\Factories;

use App\Models\Day;
use App\Models\Service;
use App\Models\Model;
use App\Models\Timing;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;


class TimingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Timing::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'date' => $this->faker->date('Y-m-d', '30 years'),
            'start' => $this->faker->time('H:i', 'now'),
            'end' => $this->faker->time('H:i', 'now'),
            'allow_multi_select' => $this->faker->boolean,
            'notes_ar' => $this->faker->name,
            'notes_en' => $fakerAr->name,
            'service_id' => Service::all()->random()->id,
            'order' => $this->faker->randomNumber()
        ];
    }
}
