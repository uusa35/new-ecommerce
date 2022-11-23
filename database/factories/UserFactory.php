<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\Country;
use App\Models\Governate;
use App\Models\Role;
use App\Models\Subscription;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $fakerAr = \Faker\Factory::create('ar_JO');
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),

            'name_ar' => $fakerAr->name(),
            'name_en' => $this->faker->name(),
            'caption_ar' => $fakerAr->realText(20),
            'caption_en' => $this->faker->realText(20),
            'name_en' => $this->faker->name(),
            'description_ar' => $this->faker->realText(120),
            'description_en' => $this->faker->realText(120),
            'service_ar' => $this->faker->realText(120),
            'service_en' => $this->faker->name(),


            'remember_token' => $this->faker->linuxPlatformToken(),
            'mobile' => $this->faker->numberBetween(111, 9999),
            'phone' => $this->faker->numberBetween(111, 999),
            'fax' => $this->faker->numberBetween(1111, 999),
            'image' => 'square.png',
            'qr' => 'sample.png',
            'banner' => 'sample.png',
            'bg' => 'sample.png',
            'phone' => $this->faker->numberBetween(111, 9999),
            'address' => $this->faker->address,
            'area_name' => $this->faker->streetName,
            'block' => $this->faker->randomDigit,
            'street' => $this->faker->streetName,
            'building' => $this->faker->randomDigit,
            'floor' => $this->faker->randomDigit,
            'apartment' => $this->faker->name(),
            'country_name' => $this->faker->country,
            'country_id' => Country::where('is_local', true)->first()->id,
            'governate_id' => fn ($array) => Governate::where('country_id', $array['country_id'])->first(),
            'area_id' => fn ($array) => Area::where('governate_id', $array['governate_id'])->first(),
            'role_id' => Role::notAdmins()->get()->random()->id,
            'api_token' => $this->faker->bankAccountNumber,
            'merchant_id' => $this->faker->bankAccountNumber,
            'file' => '1.pdf',
            'website' => $this->faker->url,
            'facebook' => $this->faker->url,
            'instagram' => $this->faker->url,
            'youtube' => $this->faker->url,
            'twitter' => $this->faker->url,
            'whatsapp' => $this->faker->numberBetween(1111, 999),
            'iphone' => $this->faker->url,
            'android' => $this->faker->url,
            'longitude' => $this->faker->longitude,
            'latitude' => $this->faker->latitude,
            'policy_ar' => $this->faker->name(),
            'policy_en' => $this->faker->name(),
            'cancellation_ar' => $this->faker->name(),
            'cancellation_en' => $this->faker->name(),
            'keywords' => $this->faker->sentence,
            'balance' => $this->faker->numberBetween(5, 99),
            'order' => $this->faker->numberBetween(1, 20),
            'on_home' => $this->faker->boolean(true),
            'is_male' => $this->faker->boolean,
            'news_letter_on' => $this->faker->boolean,
            'access_dashboard' => $this->faker->boolean(true),
            'video_url_one' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'video_url_two' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'video_url_three' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'video_url_four' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'video_url_five' => 'https://www.youtube.com/embed/GhyKqj_P2E4',
            'player_id' => $this->faker->bankAccountNumber,
            'views' => $this->faker->numberBetween(10, 999),
            'subscription_id' => Subscription::all()->random()->id,
            'end_subscription_date' => $this->faker->dateTimeBetween('now', '1 year')
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
