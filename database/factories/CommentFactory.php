<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'title' => $this->faker->name,
            'content' => $this->faker->name,
            'file' => '01.pdf',
            'commentable_id' => User::all()->random()->id,
            'user_id' => User::all()->random()->id,
            'session_id' => function ($array) {
                return $array['user_id'].$array['commentable_id'];
            },
            'commentable_type' => $this->faker->randomElement(['App\Models\User', 'App\Models\Product', 'App\Models\Service']),
            'active' => $this->faker->boolean(true),
            'viewed' => $this->faker->boolean,
            'likes' => $this->faker->numberBetween(1, 99),
        ];
    }
}
