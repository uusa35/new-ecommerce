<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->string('calling_code')->nullable();
            $table->string('country_code')->nullable();
            $table->string('image')->nullable();
            $table->integer('order')->nullable();
            $table->boolean('has_currency')->default(false);
            $table->string('currency_symbol_ar', 25)->nullable();
            $table->string('currency_symbol_en', 25)->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('is_local')->default(false);
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->decimal('minimum_shipment_charge', 6, 2)->unsigned()->default(true);
            $table->decimal('fixed_shipment_charge', 6, 2)->unsigned()->default(true);
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
        Schema::drop('countries');
    }
}
