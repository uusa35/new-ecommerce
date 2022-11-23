<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Commercial extends PrimaryModel
{
    use HasFactory, ModelHelpers;

    protected $guarded = [''];
    protected $localeStrings = ['name', 'caption'];
    protected $casts = [
        'on_home' => 'boolean',
        'is_triple' => 'boolean',
        'is_double' => 'boolean'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'categoryables');
    }

    public function scopeDouble($q)
    {
        return $q->where(['is_double' => true]);
    }

    public function scopeTriple($q)
    {
        return $q->where(['is_triple' => true]);
    }

    public function scopeForProducts($q)
    {
        return $q->where(['is_product' => true]);
    }

    public function scopeForServices($q)
    {
        return $q->where(['is_service' => true]);
    }

    public function scopeForCommercials($q)
    {
        return $q->where(['is_commercial' => true]);
    }

    public function scopeSingle($q)
    {
        return $q->where(['is_triple' => false, 'is_double' => false]);
    }

    public function getLinkAttribute()
    {
        $this->path ? asset(env('FILES') . $this->path) : $this->url;
    }
}
