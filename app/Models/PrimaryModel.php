<?php
/**
 * Created by PhpStorm.
 * User: usamaahmed
 * Date: 4/16/16
 * Time: 7:31 PM
 */
namespace App\Models;

use App\Services\Traits\ImageHelpers;
use App\Services\Traits\LocaleTrait;
use Illuminate\Database\Eloquent\Model;

class PrimaryModel extends Model
{
    use  ModelHelpers, ImageHelpers;
}
