<?php

namespace App\Models;

use App\Services\Traits\LocaleTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends PrimaryModel
{
    use HasFactory;

    protected $guarded = [''];
//    protected $localeStrings = ['name', 'caption'];
//    protected $appends = ['name'];
    protected $casts = [
        'is_designer' => 'boolean',
        'is_client' => 'boolean',
        'is_company' => 'boolean',
        'is_super' => 'boolean',
        'is_admin' => 'boolean',
        'is_author' => 'boolean',
    ];

    public function privileges()
    {
        return $this->belongsToMany(Privilege::class)->withPivot('index', 'view', 'create', 'update', 'delete');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function scopeNotAdmins()
    {
        return $this->where(['is_admin' => false, 'is_super' => false]);
    }
}
