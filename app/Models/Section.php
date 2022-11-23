<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends PrimaryModel
{
    use HasFactory, ModelHelpers;

    protected $guarded = [''];

    public function sectionable()
    {
        return $this->morphTo();
    }

}
