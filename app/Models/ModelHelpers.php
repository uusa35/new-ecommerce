<?php
/**
 * Created by PhpStorm.
 * User: usama
 * Date: 5/10/18
 * Time: 2:34 PM
 */

namespace App\Models;

use App\Services\Search\QueryFilters;

trait ModelHelpers
{
    /**
     * @param $q
     * @return \Illuminate\Database\Eloquent\Builder
     * QueryFilters used within the search
     */
    public function scopeActive($q)
    {
        return $q->where('active', true);
    }

    public function scopeOnHome($q)
    {
        return $q->where('on_home', true);
    }

    public function scopeOnNew($q)
    {
        return $q->where('on_new', true);
    }

    public function scopeAvailable($q)
    {
        return $q->where('is_available', true);
    }

    public function scopeIsFeatured($q)
    {
        return $q->where(['is_featured' => true]);
    }

    public function scopeHasImage($q)
    {
        return $q->has('images', '>', 0);
    }

    public function scopeActiveUsers($q)
    {
        return $q->whereHas("user", function ($u) {
            return $u->active();
        });
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

    public function getImageLargeAttribute()
    {

        return $this->checkStorageSpaces() ? $this->getStorageSpacesUrl('large') . $this->image : asset(env('LARGE') . $this->image);
    }

    public function getImageMediumAttribute()
    {
        return $this->checkStorageSpaces() ? $this->getStorageSpacesUrl('medium') . $this->image : asset(env('MEDIUM') . $this->image);
    }

    public function getThumbAttribute()
    {
        return $this->checkStorageSpaces() ? $this->getStorageSpacesUrl('thumbnail') . $this->image : asset(env('THUMBNAIL') . $this->image);
    }

    public function getProductSizeChartImageAttribute()
    {
        return $this->checkStorageSpaces() ? $this->getStorageSpacesUrl('thumbnail') . ($this->size_chart_image ? $this->size_chart_image : Setting::first()->size_chart) : asset(env('THUMBNAIL') . ($this->size_chart_image ? $this->size_chart_image : Setting::first()->size_chart));
    }

    public function getCurrentImageAttribute($colName = 'image', $sizeType = 'thumbnail')
    {
        return $this->{$colName} ? ($this->checkStorageSpaces() ? $this->getStorageSpacesUrl($sizeType, $colName) . $this->{$colName} : asset(env(strtoupper($sizeType)) . $this->{$colName})) : '';
    }

    public function checkStorageSpaces()
    {
        return env('FILESYSTEM_CLOUD') === 'do';
    }

    public function getStorageSpacesUrl($sizeType = 'large')
    {
        return env('DO_ROOT_URL') . env(strtoupper('DO_' . $sizeType));
    }

    public function getPathLinkAttribute()
    {
        return asset(env('FILES') . $this->path);
    }

    public function getTypeAttribute()
    {
        return strtolower(class_basename($this));
    }

}
