<?php

namespace App\Models;


use App\Services\Traits\ImageHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends PrimaryModel
{
    use HasFactory, ModelHelpers, SoftDeletes;


    public function sections()
    {
        return $this->morphMany(Section::class, 'sectionable');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }
}
