<?php
namespace Database\Seeders;
use App\Models\Alert;
use Illuminate\Database\Seeder;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Alert::factory(app()->isLocal() ? 15 : 5)->create();
    }
}
