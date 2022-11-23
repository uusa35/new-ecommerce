<?php
namespace Database\Seeders;
use App\Models\Image;
use App\Models\Setting;
use App\Models\Slide;
use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Setting::factory(1)->create()->each(function ($q) {
            $q->images()->saveMany(Image::factory(3)->create());
            $q->slides()->saveMany(Slide::factory(10)->create());
        });
    }
}
