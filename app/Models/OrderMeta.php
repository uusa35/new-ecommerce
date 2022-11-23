<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderMeta extends PrimaryModel
{
    use HasFactory, SoftDeletes;

    protected $guarded = [''];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function ordermetable()
    {
        return $this->morphTo();
    }

    public function timing() {
        return $this->belongsTo(Timing::class);
    }

    public function variant() {
        return $this->belongsTo(VariantAttribute::class);
    }

    public function merchant()
    {
        return $this->belongsTo(User::class, 'merchant_id');
    }

    public function getTypeAttribute()
    {
        return strtolower(class_basename($this->ordermetable_type));
    }

    public function scopeBooks($q) {
        return $q->where('ordermetable_type', Book::class);
    }

    public function scopeProducts($q) {
        return $q->where('ordermetable_type', Product::class);
    }

    public function scopeServices($q) {
        return $q->where('ordermetable_type', Service::class);
    }

    public function scopeCourses($q) {
        return $q->where('ordermetable_type', Course::class);
    }

    public function scopeNationalEvents($q) {
        return $q->where('ordermetable_type', Nationalevent::class);
    }
}
