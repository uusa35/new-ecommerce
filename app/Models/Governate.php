<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Governate extends PrimaryModel
{
    protected $guarded = [''];
    protected $casts = [
        'price' => 'float',
        'active' => 'boolean'
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function areas()
    {
        return $this->hasMany(Area::class);
    }

//    public function getAreaNameAttribute() {
//        return $this->appends['areaName'] = [
//            $this->name => $this->areas()->get()->pluck('name')
//        ];
//    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function nationalEvents()
    {
        return $this->hasMany(Nationalevent::class);
    }
}
