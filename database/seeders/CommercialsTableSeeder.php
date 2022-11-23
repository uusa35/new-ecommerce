<?php
namespace Database\Seeders;
use App\Models\Commercial;
use Illuminate\Database\Seeder;

class CommercialsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Commercial::factory(app()->isLocal() ? 10 : 2)->create();
    }
}
