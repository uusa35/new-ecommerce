<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Area extends PrimaryModel
{
    use HasFactory,ModelHelpers;
    protected $guarded = [''];
    protected $localeStrings = ['name'];
    protected $casts = [
        'active' => 'boolean'
    ];


    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function governate()
    {
        return $this->belongsTo(Governate::class);
    }

    public function branches()
    {
        return $this->hasMany(Branch::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'area_service');
    }

    public function classifieds()
    {
        return $this->hasMany(Classified::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

}
