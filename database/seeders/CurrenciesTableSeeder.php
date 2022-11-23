<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Currency;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrenciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $currencies = json_decode(file_get_contents('currencies.json'));
        foreach ($currencies as $currency) {
            Currency::factory()->create(
                [
                    'name_ar' => $currency->name_ar,
                    'name_en' => $currency->name_en,
                    'currency_symbol_ar' => $currency->currency_symbol_ar,
                    'currency_symbol_en' => $currency->currency_symbol_en,
                    'exchange_rate' => $currency->exchange_rate,
                    'active' => $currency->active,
                    'country_id' => $currency->country_id,
                    'image' => $currency->country_code.'.png',
                ]
            );
        }
    }
}
