<?php
namespace Database\Seeders;
use App\Models\Image;
use App\Models\Page;
use App\Models\Section;
use App\Models\Slide;
use App\Models\Template;
use Illuminate\Database\Seeder;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Page::factory(10)->create()->each(function ($q) {
            $q->images()->saveMany(Image::factory(10)->create());
            $q->slides()->saveMany(Slide::factory(10)->create());
            $q->sections()->saveMany(Section::factory(10)->create());
        });
    }
}
