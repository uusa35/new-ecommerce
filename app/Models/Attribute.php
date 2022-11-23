<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends PrimaryModel
{
    use HasFactory;

    public function attribute_values() {
        return $this->hasMany(AttributeValue::class);
    }

}
