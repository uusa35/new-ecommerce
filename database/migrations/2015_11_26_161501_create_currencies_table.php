<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCurrenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar');
            $table->string('name_en');
            $table->string('currency_symbol_ar', 25);
            $table->string('currency_symbol_en', 25);
            $table->float('exchange_rate', 6, 2)->unsigned();
            $table->integer('order')->nullable();
            $table->string('image')->nullable();
            $table->boolean('active')->default(true);

            $table->foreignId('country_id')->references('id')->on('countries');
            $table->rememberToken();
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
        Schema::dropIfExists('currencies');
    }
}
