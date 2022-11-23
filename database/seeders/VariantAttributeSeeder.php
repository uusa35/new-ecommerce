<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\Variant;
use App\Models\VariantAttribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VariantAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        VariantAttribute::factory(10)->create();
    }
}
