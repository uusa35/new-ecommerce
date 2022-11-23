<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends PrimaryModel
{
    use HasFactory, SoftDeletes;
    protected $guarded = [''];
    protected $casts = [
        'on_home' => 'boolean',
        'on_new' => 'boolean',
        'is_featured' => 'boolean',
        'is_parent' => 'boolean',
        'is_product' => 'boolean',
        'is_service' => 'boolean',
        'is_product' => 'boolean',
        'is_commercial' => 'boolean',
        'is_user' => 'boolean',
    ];

    /**
     * * ParentCategory
     * reverse
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * * ChildCategory
     * hasMany
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {

        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * Category Product hasManyThrough ProductCategory
     * ManyToMany
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function services()
    {
        return $this->morphedByMany(Service::class, 'categoryable');
    }

    public function books()
    {
        return $this->morphedByMany(Book::class, 'categoryable');
    }

    public function courses()
    {
        return $this->morphedByMany(Course::class, 'categoryable');
    }

    public function products()
    {
        return $this->morphedByMany(Product::class, 'categoryable');
    }

    public function nationalEvent()
    {
        return $this->morphedByMany(Nationalevent::class, 'categoryable');
    }

    public function users()
    {
        return $this->morphedByMany(User::class, 'categoryable');
    }

    public function commercials()
    {
        return $this->morphedByMany(Commercial::class, 'categoryable');
    }

    /**
     * MorphRelation
     * MorphOne = many hasONe relation
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }

    public function videos()
    {
        return $this->morphMany(Video::class, 'videoable');
    }

    // ManyToMay Morph
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function scopeOnlyParent($q)
    {
        return $q->where('is_parent', true);
    }

    public function scopeOnlyChildren($q)
    {
        return $q->where('parent_id','!=', 0);
    }

    public function scopeOnlyForServices($q)
    {
        return $q->where('is_service', true);
    }

    public function scopeOnlyForProducts($q)
    {
        return $q->where('is_product', true);
    }

    public function scopeOnlyForBooks($q)
    {
        return $q->where('is_book', true);
    }

    public function scopeOnlyForCourses($q)
    {
        return $q->where('is_course', true);
    }

    public function scopeOnlyForCommercials($q)
    {
        return $q->where('is_product', true);
    }

    public function scopeOnlyForUsers($q)
    {
        return $q->where('is_user', true);
    }

    public function scopeCategoryGroupsWithProperties($q)
    {
        return $q->with(['categoryGroups' => function ($q) {
            return $q->active()->has('properties', '>', 0)->with(['properties' => function ($q) {
                return $q->active()->orderBy('order', 'asc');
            }])->orderby('order', 'asc');
        }]);
    }

}
