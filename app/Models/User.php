<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, ModelHelpers, UserHelpers, SoftDeletes, HasEvents;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
    protected $dates = ['created_at', 'deleted_at', 'end_subscription_date'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'enable_receive_from_shop' => 'boolean',
        'merchant_custome_delivery_fees' => 'float',
        'email_verified_at' => 'datetime',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function branches()
    {
        return $this->hasMany(Branch::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function governate()
    {
        return $this->belongsTo(Governate::class);
    }

    public function coupons()
    {
        return $this->hasMany(Coupon::class);
    }

    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function favoritesList()
    {
        return $this->hasMany(Favorite::class, 'user_id');
    }

    public function fans()
    {
        return $this->belongsToMany(User::class, 'fans', 'fan_id');
    }

    public function myFannedList()
    {
        return $this->belongsToMany(User::class, 'fans', 'user_id', 'fan_id');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imagable');
    }


    public function slides()
    {
        return $this->morphMany(Slide::class, 'slidable');
    }

    public function videos()
    {
        return $this->morphToMany(Video::class, 'videoable');
    }

    public function alerts()
    {
        return $this->morphMany(Alert::class, 'alertable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function ratings()
    {
        return $this->morphMany(Rating::class, 'ratingable');
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }


    public function productGroup()
    {
        return $this->belongsToMany(Product::class, 'product_user');
    }

    /**
     * MorphRelation
     * MorphOne = many hasONe relation
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function ownComments()
    {
        return $this->hasMany(Comment::class);
    }

    public function classifieds()
    {
        return $this->hasMany(Classified::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }
}
