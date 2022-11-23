<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nationalevent extends PrimaryModel
{
    use HasFactory, SoftDeletes, ServiceHelpers;
    public $table = 'national_events';
    protected $guarded = [''];
    protected $dates = ['created_at', 'deleted_at', 'start_date', 'end_date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videos()
    {
        return $this->morphToMany(Video::class, 'videoable');
    }

    public function ordermetas()
    {
        return $this->morphMany(OrderMeta::class, 'ordermetable');
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    /**
     * MorphRelation
     * MorphOne = many hasONe relation
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }

    public function ratings()
    {
        return $this->morphMany(Rating::class, 'ratingable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function sections()
    {
        return $this->morphMany(Section::class, 'sectionable');
    }

    public function governates() {
        return $this->belongsTo(Governate::class);
    }
}

