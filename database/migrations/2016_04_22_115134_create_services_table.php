<?php

use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->nullable();
            $table->string('name_ar');
            $table->string('name_en');
            $table->string('caption_ar')->nullable();
            $table->string('caption_en')->nullable();
            $table->mediumText('description_en')->nullable();
            $table->mediumText('description_ar')->nullable();
            $table->mediumText('notes_ar')->nullable();
            $table->mediumText('notes_en')->nullable();
            $table->boolean('on_sale')->default(false);
            $table->boolean('exclusive')->default(false);
            $table->boolean('on_home')->default(false);
            $table->boolean('on_new')->default(false);
            $table->integer('duration')->default(true);
            $table->integer('setup_time')->nullable();
            $table->integer('delivery_time')->nullable();
            $table->integer('individuals')->unsigned()->nullable();
            $table->decimal('delivery_charge', 6, 2)->unsigned()->default(false);
            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('sale_price', 6, 2)->unsigned()->nullable();

            $table->string('keywords')->nullable();
            $table->string('image')->nullable();
            $table->integer('order')->nullable();

            $table->timestamp('start_sale')->default(Carbon::now())->nullable();
            $table->timestamp('end_sale')->default(Carbon::now())->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('is_available')->default(true);
            $table->boolean('is_hot_deal')->default(false);
            $table->boolean('multi_booking')->default(false);
            $table->boolean('direct_purchase')->default(false);
            $table->integer('booking_limit')->default(false);

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            $table->integer('views')->unsigned()->default(0);
            $table->boolean('has_addons')->default(false);
            $table->boolean('has_only_items')->default(false);
            $table->boolean('force_original_price')->default(true);
            $table->boolean('is_package')->default(false);

            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->integer('range')->nullable();
            $table->string('file')->nullable();

            $table->softDeletes();
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
        Schema::drop('services');
    }
}
