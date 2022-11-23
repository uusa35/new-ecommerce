<?php
namespace Database\Seeders;
use App\Models\Slide;
use Illuminate\Database\Seeder;

class SlidesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Slide::factory(app()->isLocal() ? 10 : 3)->create();
    }
}
