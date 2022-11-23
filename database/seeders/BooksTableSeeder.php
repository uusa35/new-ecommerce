<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\Image;
use App\Models\Alert;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Slide;
use App\Models\Tag;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Seeder;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::factory(app()->isLocal() ? 10 : 5)->create()->each(function ($p) {
            $p->categories()->saveMany(Category::all()->random(2));
            $p->tags()->saveMany(Tag::all()->random(2));
            $p->videos()->saveMany(Video::all()->random(2));
            $p->images()->saveMany(Image::factory( 3)->create());
            $p->favorites()->saveMany(Favorite::factory( 2)->create());
        });
    }
}
