<?php

namespace Database\Seeders;

use App\Models\Alert;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Image;
use App\Models\Nationalevent;
use App\Models\Product;
use App\Models\Rating;
use App\Models\Section;
use App\Models\Slide;
use App\Models\Tag;
use App\Models\User;
use App\Models\Variant;
use App\Models\VariantAttribute;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NationalEventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Nationalevent::factory(app()->isLocal() ? 10 : 1)->create()->each(function ($p) {
            $p->slides()->saveMany(Slide::factory(2)->create());
            $p->categories()->saveMany(Category::all()->random(2));
            $p->sections()->saveMany(Section::factory(3)->create());
            $p->tags()->saveMany(Tag::all()->random(2));
            $p->videos()->saveMany(Video::all()->random(2));
            $p->images()->saveMany(Image::factory(3)->create());
            $p->favorites()->saveMany(Favorite::factory(2)->create());
            $p->ratings()->saveMany(Rating::factory(2)->create());
            $p->comments()->saveMany(Comment::factory(2)->create());
        });
    }
}
