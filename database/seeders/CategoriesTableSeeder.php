<?php
namespace Database\Seeders;

use App\Models\Category;
use App\Models\CategoryGroup;
use App\Models\Property;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Category::factory(app()->environment('production') ? 2 : 4)->create(['is_parent' => 1])->each(function ($c) {
            $childOne = Category::factory()->create(['parent_id' => $c->id]);
            $childTwo = Category::factory()->create(['parent_id' => $c->id]);
             Category::factory()->create(['parent_id' => $childOne->id]);
            Category::factory()->create(['parent_id' => $childTwo->id]);
        });
    }
}
