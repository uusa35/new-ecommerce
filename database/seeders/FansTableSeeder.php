<?php
namespace Database\Seeders;
use App\Models\Fan;
use Illuminate\Database\Seeder;

class FansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Fan::factory(app()->isLocal() ? 10 : 3 )->create();
    }
}
