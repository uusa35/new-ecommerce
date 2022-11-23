<?php
namespace Usama\MyFatoorahV2;

use Illuminate\Support\ServiceProvider;

class MyFatoorahV2ServiceProvider extends ServiceProvider
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
        ],'myfatoorahv2');
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
