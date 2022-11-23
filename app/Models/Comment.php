<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends PrimaryModel
{
    use HasFactory,ModelHelpers;
    protected $guarded = [''];

    public function commentable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
