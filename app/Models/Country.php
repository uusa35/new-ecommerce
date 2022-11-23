<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Country extends PrimaryModel
{
    use ModelHelpers;

    protected $guarded = [''];
    protected $casts = [
        'is_local' => 'boolean',
        'active' => 'boolean'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function classifieds()
    {
        return $this->hasMany(Classified::class);
    }

    public function governates()
    {
        return $this->hasMany(Governate::class);
    }

    public function areas()
    {
        return $this->hasMany(Area::class);
    }

    public function currency()
    {
        return $this->hasOne(Currency::class);
    }

    // hasManyThrough
    // Many Products though user
    public function products()
    {
        return $this->hasManyThrough(Product::class, User::class);
    }

    // hasManyThrough
    // Many Products though user
    public function branches()
    {
        return $this->hasManyThrough(Branch::class, Area::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function shipment_packages()
    {
        return $this->hasMany(ShipmentPackage::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function nationalEvents() {
        return $this->hasManyThrough(Governate::class,Nationalevent::class);
    }

}
