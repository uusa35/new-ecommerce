<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['pending','paid','failed','under_process','shipped','completed','delivered', 'canceled','unknown'])->nullable()->default('pending');
            $table->boolean('paid')->default(false);
            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('shipment_fees', 6, 2)->unsigned()->default(0); //
            $table->decimal('discount', 6, 2)->unsigned()->default(0); //
            $table->decimal('net_price', 6, 2)->unsigned(); // used if coupon code exists
            $table->string('email')->nullable();
            $table->string('mobile')->nullable();
            $table->string('phone')->nullable();
            $table->mediumText('notes')->nullable();
            $table->string('reference_id')->nullable()->deafult(0);
            $table->string('payment_method')->nullable();


            $table->boolean('receive_on_branch')->default(false);
            $table->string('shipment_reference')->nullable();

            $table->string('address')->nullable();
            $table->string('area')->nullable();
            $table->string('country')->nullable();
            $table->string('block')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->string('floor')->nullable();
            $table->string('apartment')->nullable();
            $table->string('branch')->nullable();
            $table->boolean('cash_on_delivery')->default(false);

            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('coupon_id')->nullable()->constrained('coupons');
            $table->foreignId('country_id')->nullable()->constrained('countries');
            $table->foreignId('governate_id')->nullable()->constrained('governates');
            $table->foreignId('area_id')->nullable()->constrained('areas');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('orders');
    }
}
