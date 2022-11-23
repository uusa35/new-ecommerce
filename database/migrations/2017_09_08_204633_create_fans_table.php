<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fans', function (Blueprint $table) {
            $table->id();
            // the company / user receiving the fan
            $table->foreignId('user_id')->references('id')->on('users');

            // the person who did the fan
            $table->foreignId('fan_id')->references('id')->on('users');
            $table->foreignId('product_id')->nullable()->constrained();
            $table->foreignId('service_id')->nullable()->constrained();
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
        Schema::dropIfExists('fans');
    }
}
