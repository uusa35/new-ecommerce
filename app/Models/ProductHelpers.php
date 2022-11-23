<?php
/**
 * Created by PhpStorm.
 * User: usama
 * Date: 5/13/18
 * Time: 11:07 AM
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

trait ProductHelpers
{
    /**
     * Description : will fetch all products of the current company (and branch) that are bestSales
     * according to the orders that are completed
     * @param $companyId
     * @return mixed
     */
    public function scopeBestSalesProducts()
    {
        return DB::table('products')
            ->where(['products.active' => 1])
            ->join('orders', function ($j) {
                $j->where('orders.status', '=', 'success');
            })
            ->join('order_metas', function ($j) {
                $j->on('orders.id', '=', 'order_metas.order_id')->on('products.id', '=', 'order_metas.product_id');
            })
            ->select('products.id', DB::raw('count(*) as count'))
            ->groupBy('products.id')// responsible to get the sum of products returned
            ->orderBy('count', 'DESC')// DESC
            ->take(7)->pluck('id');
    }

    public function scopeServeCountries($q)
    {
//        return $q->whereHas('shipment_package', function ($q) {
//            return $q->whereHas('countries', function ($q) {
//                return $q->where(['country_id' => getCurrentCountrySessionId()]);
//            });
//        });
    }

    public function scopeHasStock($q)
    {
        if ($this->has_attributes) {
            return $q->whereHas('product_attributes', function ($q) {
                return $q->where(['has_attributes' => true])->where('qty', '>=', 1);
            });
        } else {
            return $q->where('qty', '>=', 1);
        }
    }

    public function getHasStockAttribute()
    {
        if ($this->check_stock) {
            return $this->totalAVailableQty > 0;
        }
        return true;
    }

    public function getTotalAvailableQtyAttribute()
    {
        return $this->has_attributes ? $this->product_attributes->sum('qty') : $this->qty;
    }


    public function getFinalPriceWithShipmentAttribute()
    {
        return ((double)$this->weight * (double)$this->shipment_package->charge) + $this->finalPrice;
    }

    public function getPackageFeePriceAttribute()
    {
        return (double)$this->weight * (double)$this->shipment_package->charge;
    }

    public function getHasRealAttributesAttribute()
    {
        return $this->has_attributes && $this->product_attributes->sum('qty') >= 1;
    }

    public function getRatingAttribute()
    {
        $elements = Rating::where('product_id', $this->id)->get();
        if (!$elements->isEmpty()) {
            $elementCount = $elements->count() * 100;
            $elementValues = $elements->pluck('value')->sum();
            $rating = (integer)((round($elementValues / $elementCount, 1) * 10) / 2);
            return $rating;
        }
        return 1;
    }

    public function getUniqueIdAttribute($attributeId = null)
    {
        return $this->has_attributes && !is_null($attributeId) ? (string) $this->id.''.$attributeId : (string) $this->id.''.$this->size->id.''.$this->color->id;
    }
}
