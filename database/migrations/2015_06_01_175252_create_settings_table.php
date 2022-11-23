<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->string('caption_ar')->nullable();
            $table->string('caption_en')->nullable();
            $table->string('address_ar')->nullable();
            $table->string('address_en')->nullable();
            $table->mediumText('description_ar')->nullable();
            $table->mediumText('description_en')->nullable();
            $table->longText('aboutus_ar')->nullable();
            $table->longText('aboutus_en')->nullable();
            $table->string('mobile')->nullable();
            $table->string('phone')->nullable();
            $table->string('country_ar')->nullable();
            $table->string('country_en')->nullable();
            $table->integer('zipcode')->nullable();
            $table->string('email')->nullable();
            $table->string('android')->nullable();
            $table->string('apple')->nullable();
            $table->string('youtube')->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('snapchat')->nullable();
            $table->string('image')->nullable();
            $table->string('qr')->nullable();
            $table->string('menu_bg')->nullable();
            $table->string('main_bg')->nullable();
            $table->string('shipment_notes_ar')->nullable();
            $table->string('shipment_notes_en')->nullable();
            $table->longText('policy_ar')->nullable();
            $table->longText('policy_en')->nullable();
            $table->longText('terms_ar')->nullable();
            $table->longText('terms_en')->nullable();
            $table->longText('services_ar')->nullable();
            $table->longText('services_en')->nullable();
            $table->string('shipment_prices')->nullable();

            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->mediumText('keywords')->nullable();


            $table->boolean('apply_global_shipment')->default(false);
            $table->string('size_chart_image')->nullable();
            $table->string('splash_image')->nullable();
            $table->longText('code')->nullable();


            $table->string('app_logo')->nullable();
            $table->string('gift_image')->nullable();

            $table->decimal('gift_fee', 4, 2)->unsigned()->nullable();
            $table->boolean('shipment_fixed_rate')->default(true);
            $table->decimal('shipment_fuel_percentage', 4, 2)->unsigned()->default(0.01);
            $table->string('payment_method')->default('tap');
            $table->boolean('multi_cart_merchant')->default(true);
            $table->boolean('pickup_from_branch')->default(false);
            $table->boolean('global_custome_delivery')->default(false);
            $table->boolean('show_commercials')->default(false);
            $table->string('android_version')->nullable();
            $table->string('apple_version')->nullable();

            $table->boolean('enable_whatsapp_contact')->default(false);
            $table->boolean('enable_cart')->default(true);
            $table->boolean('enable_google_translation')->default(false);
            $table->boolean('enable_favorite')->default(false);
            $table->boolean('enable_newsletter')->default(true);
            $table->boolean('enable_register')->default(true);
            $table->boolean('enable_payment_online')->default(true);
            $table->boolean('enable_cod')->default(false);
            $table->boolean('enable_receive_from_shop')->default(false);
            $table->boolean('enable_coming_soon')->default(true);

            $table->enum('default_theme', ['light', 'dark'])->default('light');
            $table->string('theme_light')->default('gray');
            $table->string('theme_dark')->default('gray');
            $table->string('font_ar')->default('font-tajwal-medium');
            $table->string('font_en')->default('font-tajwal-medium');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('settings');
    }
}
