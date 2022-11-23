<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->integer('value')->unsigned()->default(false);
            $table->boolean('is_percentage')->default(false);
            $table->boolean('active')->default(false);
            $table->boolean('consumed')->default(false);
            $table->string('code');
            // price after sale
            $table->integer('minimum_charge')->nullable();
            $table->boolean('is_permanent')->default(false);
            $table->foreignId('user_id')->nullable()->constrained();

            $table->timestamp('due_date')->nullable();
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
        Schema::drop('coupons');
    }
}
