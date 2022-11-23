<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Alert extends PrimaryModel
{
    use HasFactory,ModelHelpers;
    protected $guarded = [''];

    // Product / Service / User
    public function alertable()
    {
        return $this->morphTo();
    }
}
