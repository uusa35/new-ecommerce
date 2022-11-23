<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->nullable();
            $table->string('name_ar');
            $table->string('name_en');
            $table->string('caption_ar')->nullable();
            $table->string('caption_en')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('notes_ar')->nullable();
            $table->text('notes_en')->nullable();
            $table->boolean('on_new')->default(false);
            $table->boolean('home_delivery_availability')->default(false);
            $table->boolean('shipment_availability')->default(false);
            $table->string('delivery_time')->nullable();
            $table->boolean('exclusive')->default(false);
            $table->boolean('on_sale')->default(false);
            $table->boolean('on_home')->default(false);
            $table->boolean('is_available')->default(false);
            $table->decimal('weight', 4, 2)->unsigned();
            $table->decimal('price', 6, 2)->unsigned();
            $table->decimal('sale_price', 6, 2)->unsigned()->nullable();
            $table->string('keywords')->nullable();
            $table->string('image')->nullable();

            $table->timestamp('start_sale')->default(Carbon::now())->nullable();
            $table->timestamp('end_sale')->default(Carbon::now())->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('check_stock')->default(true);
            $table->boolean('is_hot_deal')->default(false);
            $table->boolean('wrap_as_gift')->default(false);

            $table->integer('qty')->unsigned()->nullable();
            $table->string('qr')->nullable();
            $table->integer('views')->unsigned()->default(0);
            $table->boolean('direct_purchase')->default(false);
            $table->string('barcode')->nullable();
            $table->integer('order')->nullable();


            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->boolean('free')->default(true);
            $table->string('file')->nullable();
            $table->string('preview')->nullable();
            $table->boolean('download')->default(false);
            $table->longText('embedded')->nullable();
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
        Schema::dropIfExists('books');
    }
}
