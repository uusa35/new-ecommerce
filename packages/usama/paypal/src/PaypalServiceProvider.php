<?php
namespace Usama\Paypal;

use Illuminate\Support\ServiceProvider;

class PaypalServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        include __DIR__ . '/routes.php';
        $this->publishes([
            __DIR__ . '/config' => config_path(),
        ],'paypal');
//        $this->publishes([
//            __DIR__ . '/Services' => app_path('Services'),
//        ],'tap');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }
}
