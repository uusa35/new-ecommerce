<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Variant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttributesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        DB::table('options')->truncate();
//        DB::table('option_values')->truncate();
        $array = collect([
            [
                'name' => 'color',
                'values' => ['red', 'green', 'yellow', 'rose','blue']
            ],
            [
                'name' => 'size',
                'values' => ['small', 'large', 'xlarge', 'medium']
            ],
            [
                'name' => 'capacity',
                'values' => ['64GB', '128GB', '256GB', '512GB']
            ], [
                'name' => 'height',
                'values' => ['100', '120', '140', '160']
            ], [
                'name' => 'length',
                'values' => ['40', '60', '80', '100']
            ]
        ]);
        $array->each(function ($element) {
            Attribute::factory()->create([
                'name_ar' => $element['name'],
                'name_en' => $element['name'],
                'slug_ar' => $element['name'],
                'slug_en' => $element['name'],
            ])->each(function ($o) use ($element) {
                foreach ($element['values'] as $key => $value) {
                    $o->attribute_values()->saveMany(AttributeValue::factory(1)->create(['value' => $value]));
                }
            });
        });
    }
}
