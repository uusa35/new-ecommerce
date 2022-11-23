<?php
namespace Database\Seeders;
use App\Models\Area;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Governate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countries = json_decode(file_get_contents('countries.json'));
        foreach ($countries as $country) {
            Country::create(
                [
                    'name_ar' => $country->name_ar,
                    'name_en' => $country->name_en,
                    'calling_code' => $country->calling_code,
                    'country_code' => $country->country_code,
                    'image' => $country->country_code.'.png',
                    'order' => $country->order,
                    'has_currency' => $country->has_currency,
                    'currency_symbol_ar' => $country->currency_symbol_ar,
                    'currency_symbol_en' => $country->currency_symbol_en,
                    'active' => $country->active,
                    'is_local' => $country->is_local,
                    'minimum_shipment_charge' => $country->minimum_shipment_charge,
                    'fixed_shipment_charge' => $country->fixed_shipment_charge,
                    'longitude' => $country->longitude,
                    'latitude' => $country->latitude,
                ]
            );
        }
    }
}
