<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Favorite extends PrimaryModel
{
    use HasFactory, ModelHelpers;
    protected $guarded = [''];

    public function favoritable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
