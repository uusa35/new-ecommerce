<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Video extends PrimaryModel
{
    use HasFactory,ModelHelpers;
    protected $guarded = [''];
    protected $localeStrings = ['caption','name'];

    public function services()
    {
        return $this->morphedByMany(Service::class, 'videoable');
    }

    public function books()
    {
        return $this->morphedByMany(Book::class, 'videoable');
    }

    public function courses()
    {
        return $this->morphedByMany(Course::class, 'videoable');
    }

    public function products()
    {
        return $this->morphedByMany(Product::class, 'videoable');
    }

    public function nationalEvents()
    {
        return $this->morphedByMany(Nationalevent::class, 'videoable');
    }

    public function categories() {
        return $this->belongsToMany(Category::class,'categoryables');
    }
}
