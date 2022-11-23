<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Currency extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];
    protected $casts = [
        'exchange_rate' => 'float'
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function getSymbolAttribute()
    {
        $symbol = app()->isLocale('ar') ? 'currency_symbol_ar' : 'currency_symbol_en';
        return $this->$symbol;
    }
}
