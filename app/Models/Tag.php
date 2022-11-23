<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends PrimaryModel
{
    use HasFactory;
    protected $localeStrings = ['name'];
    protected $guarded = [''];

    public function services()
    {
        return $this->morphedByMany(Service::class, 'taggable');
    }

    public function books()
    {
        return $this->morphedByMany(Book::class, 'taggable');
    }

    public function courses()
    {
        return $this->morphedByMany(Course::class, 'taggable');
    }

    public function products()
    {
        return $this->morphedByMany(Product::class, 'taggable');
    }
}
