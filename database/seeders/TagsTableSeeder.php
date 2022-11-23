<?php
namespace Database\Seeders;
use App\Models\Product;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tag::factory(app()->isLocal() ? 10 : 2)->create();
    }
}
