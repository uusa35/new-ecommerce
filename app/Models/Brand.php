<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends PrimaryModel
{
    use HasFactory,ModelHelpers;
    protected $localeStrings = ['name'];
    protected $guarded = [''];
    protected $casts = [
        'on_home' => 'boolean',
        'active' => 'boolean'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
