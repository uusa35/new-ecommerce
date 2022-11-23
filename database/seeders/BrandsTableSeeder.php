<?php
namespace Database\Seeders;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Seeder;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Brand::factory(app()->isLocal() ? 10 : 2)->create();
    }
}
