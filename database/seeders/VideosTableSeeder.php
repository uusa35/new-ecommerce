<?php
namespace Database\Seeders;
use App\Models\Slide;
use App\Models\Video;
use Illuminate\Database\Seeder;

class VideosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Video::factory(app()->isLocal() ? 10 : 2)->create();
    }
}
