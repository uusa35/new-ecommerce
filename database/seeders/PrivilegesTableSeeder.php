<?php

namespace Database\Seeders;

use App\Models\Privilege;
use Illuminate\Database\Seeder;

class PrivilegesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $privileges = [
            [
                'name' => 'category',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => false
            ],
            [
                'name' => 'product',
                "main_menu" => true,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'attribute',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'variant',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'subscription',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => false
            ],
            [
                'name' => 'slide',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'service',
                "main_menu" => true,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'timing',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => false
            ],
            [
                'name' => 'nationalevent',
                "main_menu" => true,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'role',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => true
            ],
            [
                'name' => 'user',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'setting',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'currency',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'video',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'country',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'image',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => true
            ],
            [
                'name' => 'page',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => false
            ],
            [
                'name' => 'tag',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'brand',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'branch',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'area',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'governate',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'privilege',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => true
            ],
            [
                'name' => 'coupon',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => false
            ],
            [
                'name' => 'faq',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'commercial',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'shipment',
                "main_menu" => false,
                "on_top" => true,
                'hide_module' => true
            ],
//            [
//                'name' => 'notification',
//                "main_menu" => false,
//                "on_top" => true,
//                'hide_module' => false
//            ],
            [
                'name' => 'device',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'book',
                "main_menu" => true,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'address',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => false
            ],
            [
                'name' => 'section',
                "main_menu" => false,
                "on_top" => false,
                'hide_module' => true
            ],
            [
                'name' => 'post',
                "main_menu" => true,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'course',
                "main_menu" => true,
                "on_top" => true,
                'hide_module' => false
            ],
            [
                'name' => 'order',
                "main_menu" => true,
                "on_top" => true,
                'hide_module' => false
            ],
        ];
        foreach ($privileges as $key =>$item) {
            Privilege::factory(1)->create([
                'order' => $key,
                'name' => $item['name'],
                'name_en' => $item['name'],
                'name_ar' => $item['name'],
                'main_menu' => $item['main_menu'],
                'hide_module' => $item['hide_module'],
                'on_top' => $item['on_top'],
                'description_ar' => $item['name'],
                'description_en' => $item['name'],
            ]);
        }
    }
}
