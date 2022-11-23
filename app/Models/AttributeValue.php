<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends PrimaryModel
{
    use HasFactory;
    public $table = 'attribute_values';
//    public $with = ['attribute'];

    public function attribute() {
        return $this->belongsTo(Attribute::class);
    }


}
