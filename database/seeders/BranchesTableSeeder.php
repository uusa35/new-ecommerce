<?php
namespace Database\Seeders;
use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Branch::factory(app()->isLocal() ? 10 : 3)->create();
    }
}
