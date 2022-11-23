<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function areaName()
    {
        return $this->belongsTo(Area::class,'area_id');
    }

    public function governate()
    {
        return $this->belongsTo(Country::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
