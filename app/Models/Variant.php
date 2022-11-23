<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends PrimaryModel
{
    use HasFactory;

    public function attributes()
    {
        return $this->hasMany(VariantAttribute::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
