<?php
namespace Database\Seeders;
use App\Models\Area;
use App\Models\Country;
use App\Models\Governate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $governates = json_decode(file_get_contents('areas.json'));
        foreach ($governates as $governate) {
            foreach($governate->areas as $area) {
                $currentGovernate = Governate::where('code', $governate->code)->first();
                Area::create([
                    'name_en' => $area->name,
                    'name_ar' => $area->name,
                    'code' => $area->code,
                    'country_id' => $currentGovernate->country_id,
                    'governate_id' => $currentGovernate->id,
                    'order' => random_int(1,99),
                ]);
            }
        }
    }
}
