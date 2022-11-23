<?php

namespace Database\Seeders;

use App\Models\Addon;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Image;
use App\Models\Item;
use App\Models\Alert;
use App\Models\Rating;
use App\Models\Service;
use App\Models\Slide;
use App\Models\Tag;
use App\Models\Timing;
use App\Models\Video;
use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Service::factory(app()->isLocal() ? 10 : 2)->create()->each(function ($p) {
            $p->categories()->saveMany(Category::all()->random(2));
            $p->timings()->saveMany(Timing::factory(2)->create());
            $p->tags()->saveMany(Tag::all()->random(2));
            $p->videos()->saveMany(Video::all()->random(2));
            $p->alerts()->saveMany(Alert::all()->random(2));
            $p->slides()->saveMany(Slide::all()->random(2));
            $p->favorites()->saveMany(Favorite::factory( 2)->create());
            $p->images()->saveMany(Image::factory(2)->create());
            $p->comments()->saveMany(Comment::factory( 2)->create());
            $p->ratings()->saveMany(Rating::factory( 2)->create());
        });
    }
}
