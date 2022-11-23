<?php

namespace Database\Seeders;

use App\Models\Translation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Lang;
use TCG\Voyager\Models\Category;
use TCG\Voyager\Models\DataType;
use TCG\Voyager\Models\MenuItem;
use TCG\Voyager\Models\Page;

class TranslationsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        $generalAr = Lang::get('general', [], 'ar');
        foreach ($generalAr as $key => $value) {
            Translation::factory(1)->create([
                'key' => $key,
                'group' => 'general',
                'ar' => $value,
                'en' => trans('general.'.$key,[],'en')
            ]);
        }
    }
}
