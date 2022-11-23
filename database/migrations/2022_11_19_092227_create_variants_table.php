<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete(); // Color / Size
            $table->decimal('price', 6, 2)->unsigned()->default(0);
            $table->decimal('sale_price', 6, 2)->unsigned()->default(0);
            $table->boolean('on_sale')->default(false);
            $table->integer('qty')->unsigned()->nullable()->default(0);
            $table->string('qr')->nullable();
            $table->string('sku')->nullable();
            $table->string('image')->nullable()->default('product.png');

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
        Schema::dropIfExists('variants');
    }
};
