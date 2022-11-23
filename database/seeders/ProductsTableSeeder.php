<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Image;
use App\Models\Alert;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductVariant;
use App\Models\Rating;
use App\Models\Slide;
use App\Models\Tag;
use App\Models\User;
use App\Models\Variant;
use App\Models\VariantAttribute;
use App\Models\Video;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::factory(app()->isLocal() ? 10 : 1)->create()->each(function ($p) {
            if ($p->has_attributes) {
                $p->variants()->saveMany(Variant::factory(3)->create()->each(function ($v) {
                    return $v->attributes()->saveMany(VariantAttribute::factory(1)->create());
                }));
            }
            $p->slides()->saveMany(Slide::factory(2)->create());
            $p->categories()->saveMany(Category::all()->random(2));
            $p->tags()->saveMany(Tag::all()->random(2));
            $p->videos()->saveMany(Video::all()->random(2));
            $p->alerts()->saveMany(Alert::all()->random(2));
            $p->images()->saveMany(Image::factory(3)->create());
            $p->favorites()->saveMany(Favorite::factory(2)->create());
            $p->ratings()->saveMany(Rating::factory(2)->create());
            $p->userGroup()->saveMany(User::all()->random(3));
            $p->comments()->saveMany(Comment::factory(2)->create());
        });
    }
}
