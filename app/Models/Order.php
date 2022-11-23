<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Order extends PrimaryModel
{
    use HasFactory, SoftDeletes, Notifiable;
    protected $guarded = [''];
    protected $casts = [
        'shipment_fees' => 'float',
        'discount' => 'float',
        'paid' => 'boolean',
        'receive_on_branch' => 'boolean',
        'multi_cart_merchant' => 'boolean',
        'mobile' => 'string'
    ];

    /**
     * Order OrderMeta
     * hasMany
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function order_metas()
    {
        return $this->hasMany(OrderMeta::class);
    }

    /**
     * User Order
     * hasMany
     * reverse
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_metas', 'order_id', 'product_id');
    }

    public function services()
    {
        return $this->belongsToMany(Product::class, 'order_metas', 'order_id', 'service_id');
    }

    public function scopeOfStatus($query, $type)
    {
        return $query->where('status', $type);

    }

    public function getTotalElementsPriceAttribute()
    {
        // this price is the actual price of the product when order is created. (product/service price or sale accordingly)
        return $this->order_metas->sum('price');
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function scopePaid($q)
    {
        return $q->where('paid', true);
    }

    public function routeNotificationForOneSignal()
    {
        /*
         * you have to return the one signal player id tat will
         * receive the message of if you want you can return
         * an array of players id
         */

        return $this->data->user_one_signal_id;
    }

    public function country() {
        return $this->belongsTo(Country::class);
    }

    public function governate() {
        return $this->belongsTo(Governate::class);
    }
}
