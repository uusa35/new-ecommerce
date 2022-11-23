<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Image;
use App\Models\Alert;
use App\Models\Post;
use App\Models\Rating;
use App\Models\ShipmentPackage;
use App\Models\Slide;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(app()->isLocal() ? 10 : 5)->create()->each(function ($p) {
            if ($p->id === 1) {
                $p->update(['role_id' => 1, 'email' => 'super@super.com']);
            } elseif ($p->id === 2) {
                $p->update(['role_id' => 2, 'email' => 'admin@admin.com']);
            } elseif ($p->id === 3) {
                $p->update(['role_id' => 3, 'email' => 'company@company.com']);
            } elseif ($p->id === 4) {
                $p->update(['role_id' => 4, 'email' => 'author@author.com']);
            } elseif ($p->id === 5) {
                $p->update(['role_id' => 5, 'email' => 'client@client.com']);
            }
            $p->categories()->saveMany(Category::all()->random(2));
            $p->slides()->saveMany(Slide::factory(2)->create());
            $p->images()->saveMany(Image::factory(2)->create());
            $p->comments()->saveMany(Comment::factory(2)->create());
            $p->favorites()->saveMany(Favorite::factory(2)->create());
            $p->ratings()->saveMany(Rating::factory(2)->create());
            $p->alerts()->saveMany(Alert::factory(2)->create());
        });
    }
}
