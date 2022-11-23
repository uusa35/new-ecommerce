<?php

namespace App\Models;

use Carbon\Carbon;

/**
 * Created by PhpStorm.
 * User: usama
 * Date: 2019-03-07
 * Time: 07:10
 */
trait SellingModelHelpers
{
    public function getCanOrderAttribute($qty = 1, $attributeId = null)
    {
        if ($this->hasRealAttributes) {
            if (is_null($attributeId)) {
                return $this->active && $this->is_available && $this->totalAvailableQty >= $qty;
            }
            return $this->active && $this->is_available && $this->product_attributes->where('id', $attributeId)->first()->qty >= $qty;
        }
        return $this->active && $this->is_available && $this->qty >= $qty;
    }

    public function getCanBookAttribute($timingId, $daySelectedFormat)
    {
        // service is active and no orderMetas in the same date and time then go ahead
        if ($this->active && $this->is_available) {
            // in case day is now and time passed
            if ($daySelectedFormat === Carbon::parse()->format('m/d/Y')) {
                $timing = Timing::whereId($timingId)->first();
                return Carbon::now('Asia/Kuwait')->addHour(5)->format('H:m:s') > $timing->start;
            }
            $orderMetasWithSameService = OrderMeta::where(
                [
                    'service_id' => $this->id,
                    'timing_id' => $timingId
                ])
                ->whereDate('service_date', '=', Carbon::parse($daySelectedFormat))->whereHas('order', function ($q) {
                    return $q->where('paid', true);
                })->get();
            if ($this->multi_booking) {
                return $orderMetasWithSameService->count() < $this->booking_limit;
            }
            return $orderMetasWithSameService->count() < 1;
        }
        return $this->active && $this->is_availaable;
    }

    public function scopeOnSaleOnHome($q)
    {
        return $q->onSale()->where('on_home', true);
    }

    public function scopeOnSale($q)
    {
        return $q->where('on_sale', true)->whereDate('end_sale', '>', Carbon::now());
    }

    public function getIsOnSaleAttribute()
    {
        return $this->on_sale && Carbon::parse($this->end_sale) > Carbon::now();
    }

    public function scopeHotDeals($q)
    {
        return $q->onSale()->where('is_hot_deal', true);
    }

    public function getIsReallyHotAttribute()
    {
        return $this->isOnSale && $this->is_hot_deal;
    }

    public function getFinalPriceAttribute()
    {
        return round($this->isOnSale ? (double)$this->sale_price : (double)$this->price,2);
    }

    public function getConvertedFinalPriceAttribute()
    {
        $currentCurrency = getCurrentCurrency();
        return round($this->finalPrice * $currentCurrency->exchange_rate,2);
    }

    public function getConvertedPriceAttribute()
    {
        $currentCurrency = getCurrentCurrency();
        return round($this->price * $currentCurrency->exchange_rate,2);
    }

    public function getConvertedSalePriceAttribute()
    {
        $currentCurrency = session()->get('currency');
        return round($this->sale_price * $currentCurrency->exchange_rate,2);
    }

//    public function getUIdAttribute()
//    {
//        return str_singular($this->getTable()) . $this->id;
//    }

    public function scopeHasProductAttributes($q)
    {
        return $q->whereHas('product_attributes', function ($q) {
            return $q;
        }, '>', 0);
    }

    public function getRelatedItems($item)
    {
        $categoriesId = $item->categories->pluck('id');
        return $this->where(['user_id' => $item->user_id])->where('id', '!=', $item->id)->active()->with('images', 'favorites')->take(10)->get();
    }

    public function getIsFavoritedAttribute()
    {
        return auth()->check() ? in_array(auth()->user()->id, $this->favorites->pluck('id')->toArray()) : false;
    }

    public function scopeMyItems($q)
    {
        if (auth()->user()->isAdminOrAbove) {
            return $q;
        }
        return $q->where(['user_id' => auth()->id()]);
    }

    public function scopeHasAtLeastOneCategory($q) {
        return $q->whereHas('categories', function ($q) {
            return $q->active();
        },'>',0);
    }

}
