<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar')->nullalbe();
            $table->string('name_en')->nullalbe();
            $table->boolean('active')->default(true);
            $table->integer('order')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->string('code')->nullable();

            $table->foreignId('country_id')->references('id')->on('countries');
            $table->foreignId('governate_id')->references('id')->on('governates');
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
        Schema::drop('areas');
    }
}
