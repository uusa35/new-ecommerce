<?php

namespace App\Imports;

use App\Models\Category;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class CategoriesImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if ($row[0] !== '#' && !is_null($row[0])) {
                Category::create([
                    'id' => $row[0],
                    'name' => $row[2],
                    'name_ar' => $row[1],
                    'name_en' => $row[2],
                    'description_ar' => (string)$row[3],
                    'description_en' => (string)$row[4],
                    'caption_ar' => (string)$row[3],
                    'caption_en' => (string)$row[4],
                    'parent_id' => $row[5],
                    'order' => $row[6],
                    'is_parent' => $row[7],
                    'is_product' => true,
                    'is_user' => true,
                    'is_book' => true,
                    'is_market' => true,
                    'image' => $row[8] ? $row[8] : 'square.png',
                    'image_rectangle' => $row[8] ? $row[8] : 'square.png',
                ]);
            }
        }
    }
}
