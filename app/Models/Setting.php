<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Setting extends PrimaryModel
{
    use HasFactory;

    protected $guarded = [''];
    protected $casts = [
        'multi_cart_merchant' => 'boolean',
        'apply_global_shipment' => 'apply_global_shipment',
        'cash_on_delivery' => 'boolean',
        'apply_global_shipment' => 'boolean',
        'show_commercials' => 'boolean',
        'enable_products' => 'boolean',
        'enable_courses' => 'boolean',
        'enable_services' => 'boolean',
        'enable_books' => 'boolean',
        'enable_faqs' => 'boolean',
        'enable_subscriptions' => 'boolean',
        'enable_whatsapp_contact' => 'boolean',
        'enable_cart' => 'boolean',
        'enable_google_translation' => 'boolean',
        'enable_favorite' => 'boolean',
        'enable_newsletter' => 'boolean',
        'enable_payment_online' => 'boolean',
        'enable_receive_from_shop' => 'boolean'
    ];

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }

    public function getFullWhatsappAttribute()
    {
        return '965' . numToEn($this->whatsapp);
    }

    public function getCountryAttribute()
    {
        return $this->country;
    }

    public function getAddressAttribute()
    {
        return $this->address;
    }

    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }
}
