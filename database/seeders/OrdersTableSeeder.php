<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderMeta;
use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::factory(app()->isLocal() ? 10 : 2)->create()->each(function ($o) {
            $o->order_metas()->saveMany(OrderMeta::factory(4)->create());
        });
    }
}
