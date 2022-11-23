<?php
namespace Database\Seeders;
use App\Models\Governate;
use Illuminate\Database\Seeder;

class GovernatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $governates = json_decode(file_get_contents('governates.json'));
        foreach ($governates as $gov) {
            Governate::create([
                'name_ar' => $gov->name_ar,
                'name_en' => $gov->name_en,
                'order' => $gov->order,
                'active' => 1,
                'country_id' => $gov->country_id,
                'code' => $gov->code,
                'price' => $gov->price,
            ]);
        }
    }
}
