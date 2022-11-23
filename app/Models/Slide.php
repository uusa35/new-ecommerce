<?php

namespace App\Models;

use App\Services\Search\QueryFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Slide extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [''];
    protected $appends = ['realType'];

    public function slidable()
    {
        return $this->morphTo();
    }

    public function getRealTypeAttribute()
    {
        return strtolower(class_basename($this->slidable_type));
    }

    /**
     * @param $q
     * @param QueryFilters $filters
     * @return \Illuminate\Database\Eloquent\Builder
     * QueryFilters used within the search
     */
    public function scopeFilters($q, QueryFilters $filters)
    {
        return $filters->apply($q);
    }

    public function scopeActive($q) {
        return $q->where(['active' => true]);
    }
}
