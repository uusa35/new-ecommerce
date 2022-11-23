<?php

namespace App\Imports;

use App\Models\Product;
use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProductsImport implements ToCollection
{

    public $userId;
    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if($row[0] !== '#' && !is_null($row[0])) {
                Product::create([
                    'name_ar' => $row[1],
                    'name_en' => $row[2],
                    'price' => (float) $row[3],
                    'sale_price' => (float) $row[4],
                    'description_ar' => (string) $row[5],
                    'description_en' => (string) $row[6],
                    'qty' => (integer) [7],
                    'weight' => '0.1',
                    'sku' => rand(111,999),
                    'image' => $row[8] ? $row[8] : 'product.png',
                    'user_id' => (integer) $this->userId,
                ]);
            }
        }
    }
}
