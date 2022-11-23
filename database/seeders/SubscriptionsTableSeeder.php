<?php

namespace Database\Seeders;

use App\Models\Subscription;
use Illuminate\Database\Seeder;

class SubscriptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subscriptions = [
            'free' => 1,
            'sliver' => 3,
            'gold' => 6
        ];
        foreach ($subscriptions as $k => $v) {
            Subscription::factory(1)->create([
                'name_en' => $k,
                'name_ar' => $k,
//                'description_ar' => $k,
//                'description_en' => $k,
                'notes_ar' => $k,
                'notes_en' => $k,
                'months' => $v
            ]);
        }
    }
}
