<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantAttribute extends PrimaryModel
{
    use HasFactory;
    public $table = 'variant_attribute';


    public function attribute() {
        return $this->belongsTo(AttributeValue::class);
    }

    public function variant() {
        return $this->belongsTo(Variant::class);
    }
}
