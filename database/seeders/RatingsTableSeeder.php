<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Seeder;

class RatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Rating::factory(app()->isLocal() ? 5 : 2)->create();
    }
}
