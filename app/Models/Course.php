<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends PrimaryModel
{
    use HasFactory, SoftDeletes, SellingModelHelpers;
    protected $dates = ['created_at', 'deleted_at', 'start_sale', 'end_sale'];
    protected $guarded = [''];
    protected $casts = [
        'free' => "boolean",
        'exclusive' => 'boolean',
        'on_home' => 'boolean',
        'on_new' => 'boolean',
        'is_available' => 'boolean',
        'on_sale' => 'boolean',
        'isOnSale' => 'boolean',
        'check_stock' => 'boolean',
        'direct_purchase' => 'boolean',
        'download' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function videos()
    {
        return $this->morphToMany(Video::class, 'videoable');
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

    public function ratings()
    {
        return $this->morphMany(Rating::class, 'ratingable');
    }

    public function order_metas()
    {
        return $this->morphMany(OrderMeta::class, 'ordermetable');
    }

}
