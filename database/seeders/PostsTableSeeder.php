<?php
namespace Database\Seeders;
use App\Models\Comment;
use App\Models\Image;
use App\Models\Post;
use App\Models\Section;
use App\Models\Slide;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::factory(app()->isLocal() ? 5 : 2)->create()->each(function ($p) {
            $p->comments()->saveMany(Comment::factory(2)->create());
            $p->sections()->saveMany(Section::factory(2)->create());
            $p->images()->saveMany(Image::factory(2)->create());
            $p->slides()->saveMany(Slide::factory(2)->create());
        });
    }
}
