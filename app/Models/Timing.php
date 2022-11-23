<?php

namespace App\Models;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Scope;

class Timing extends PrimaryModel
{
    use HasFactory;
    protected $dates = ['created_at', 'updated_at'];
    protected $localeStrings = ['notes'];
    protected $guarded = [''];
    protected $casts = [
        'allow_multi_select' => 'boolean',
        'active' => 'boolean'
    ];


    // timing can be attached to only one service if enable_global_service is false
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
