<?php

namespace App\Imports;

use App\Models\Area;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;

class UsersImport implements ToCollection
{

    public $roleId;
    public $countryId;
    public function __construct($roleId, $countryId)
    {
        $this->roleId = $roleId;
        $this->countryId = $countryId;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if($row[0] !== '#' && !is_null($row[0])) {
                User::create([
                    'name' => $row[2],
                    'name_ar' => $row[1],
                    'name_en' => $row[2],
                    'role_id' => $this->roleId,
                    'description_ar' => (string) $row[3],
                    'description_en' => (string) $row[4],
                    'email' => (string) $row[5],
                    'whatsapp' => (string) $row[6],
                    'country_id' => $this->countryId,
                    'area_id' => Area::where('country_id', $this->countryId)->first()->id,
                    'subscription_id' => Subscription::first()->id,
                    'image' => 'square.png',
                    'password' => Hash::make('secret')
                ]);
            }
        }
    }
}
