<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Address;
use App\Models\Book;
use App\Models\Brand;
use App\Models\Color;
use App\Models\Coupon;
use App\Models\Currency;
use App\Models\Faq;
use App\Models\Governate;
use App\Models\Nationalevent;
use App\Models\Page;
use App\Models\Privilege;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\User;
use App\Policies\AddressPolicy;
use App\Policies\AreaPolicy;
use App\Policies\BookPolicy;
use App\Policies\BrandPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\ColorPolicy;
use App\Policies\CommentPolicy;
use App\Policies\CountryPolicy;
use App\Policies\CouponPolicy;
use App\Policies\CoursePolicy;
use App\Policies\CurrencyPolicy;
use App\Policies\FaqPolicy;
use App\Policies\GovernatePolicy;
use App\Policies\NationalEventPolicy;
use App\Policies\OrderPolicy;
use App\Policies\PagePolicy;
use App\Policies\PostPolicy;
use App\Policies\PrivilegePolicy;
use App\Policies\ProductAttributePolicy;
use App\Policies\ProductPolicy;
use App\Policies\RolePolicy;
use App\Policies\ServicePolicy;
use App\Policies\SettingPolicy;
use App\Policies\SizePolicy;
use App\Policies\SlidePolicy;
use App\Policies\TagPolicy;
use App\Policies\UserPolicy;
use App\Policies\VideoPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Product::class => ProductPolicy::class,
        Service::class => ServicePolicy::class,
        Nationalevent::class => NationalEventPolicy::class,
        Category::class => CategoryPolicy::class,
        User::class => UserPolicy::class,
        Order::class => OrderPolicy::class,
        Setting::class => SettingPolicy::class,
        Book::class => BookPolicy::class,
        Course::class => CoursePolicy::class,
        Size::class => SizePolicy::class,
        Color::class => ColorPolicy::class,
        Tag::class => TagPolicy::class,
        Post::class => PostPolicy::class,
        Country::class => CountryPolicy::class,
        Currency::class => CurrencyPolicy::class,
        Area::class => AreaPolicy::class,
        Governate::class => GovernatePolicy::class,
        Slide::class => SlidePolicy::class,
        Video::class => VideoPolicy::class,
        Page::class => PagePolicy::class,
        Comment::class => CommentPolicy::class,
        Address::class => AddressPolicy::class,
        Role::class => RolePolicy::class,
        Privilege::class => PrivilegePolicy::class,
        Coupon::class => CouponPolicy::class,
        Faq::class => FaqPolicy::class,
        Brand::class => BrandPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('superOne', function () {
            return auth()->user()->isSuper && auth()->id() === 1;
        });

        Gate::define('isAdminOrAbove', function () {
            return auth()->user()->isAdminOrAbove; // means if isSuper or isAdmin then go ahead
        });

        Gate::define('isAdmin', function () {
            return auth()->user()->isAdmin; // means if isSupern then go ahead
        });

        Gate::define('isSuper', function () {
            return auth()->user()->isSuper;
        });

        Gate::define('isCompanyOrAbove', function () {
            return auth()->user()->isAdminOrAbove ? auth()->user()->isAdminOrAbove : auth()->user()->role->is_company;
        });

        Gate::define('isCompany', function () {
            return auth()->user()->role->is_company;
        });

        Gate::define('isDesigner', function () {
            return auth()->user()->role->is_designer;
        });

        Gate::define('dashboard', function () {
            return auth()->user()->access_dashboard;
        });

        Gate::define('index', function ($user, $index) {
            if ($user->role->privileges->where('name', $index)->first()) {
                return $user->role->privileges->where('name', $index)->first()->pivot->index;
            }
            return false;
        });

        Gate::define('search', function ($user, $index) {
            return $user->role->privileges->where('name', $index)->first() && $user->role->privileges->where('name', $index)->first()->pivot->index;
        });
    }
}
