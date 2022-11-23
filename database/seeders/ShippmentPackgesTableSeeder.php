<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\ShipmentPackage;
use Illuminate\Database\Seeder;

class ShippmentPackgesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ShipmentPackage::factory(app()->isLocal() ? 20 : 2)->create();
    }
}
