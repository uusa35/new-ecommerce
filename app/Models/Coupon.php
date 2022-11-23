<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Coupon extends PrimaryModel
{
    use HasFactory;
    protected $dates = ['created_at', 'updated_at','due_date'];
    protected $guarded = [''];
    protected $casts = [
        'is_percentage' => 'boolean',
        'is_permanent' => 'boolean',
        'consumed' => 'boolean',
        'active' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
