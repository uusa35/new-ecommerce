<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_metas', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable();
            $table->mediumText('description')->nullable();
            $table->integer('qty')->unsigned(); // saved as timing_id in case of services
            $table->date('booked_at')->nullable();
            $table->time('time')->nullable();

            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('shipment_cost', 6, 2)->unsigned()->nullable();
            $table->text('notes')->nullable();
            $table->integer('merchant_id')->nullable();
            $table->boolean('wrap_as_gift')->default(false);

            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('timing_id')->nullable()->constrained('timings');
            $table->foreignId('variant_attribute_id')->nullable()->constrained('variant_attribute');

            $table->morphs('ordermetable');
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
        Schema::drop('order_metas');
    }
}
