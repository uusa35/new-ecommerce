<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();

            $table->string('name_ar');
            $table->string('name_en');
            $table->mediumText('caption_ar')->nullable();
            $table->mediumText('caption_en')->nullable();
            $table->mediumText('description_en')->nullable();
            $table->mediumText('description_ar')->nullable();

            $table->boolean('limited')->default(false);
            $table->boolean('on_home')->default(false);
            $table->boolean('on_new')->default(false);
            $table->boolean('is_parent')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_service')->default(false);
            $table->boolean('is_product')->default(false);
            $table->boolean('is_commercial')->default(false);
            $table->boolean('is_user')->default(false);
            $table->boolean('is_book')->default(false);
            $table->boolean('is_course')->default(false);
            $table->boolean('is_national_event')->default(false);
            $table->string('image')->nullable();
            $table->string('image_rectangle')->nullable();
            $table->string('icon')->nullable();
            $table->integer('order')->nullable();
            $table->integer('min')->default(false)->nullable();
            $table->bigInteger('max')->default(false)->nullable();
            $table->string('file')->nullable();
            $table->boolean('active')->default(true);

            $table->integer('parent_id')->nullable()->unsigned()->default(false)->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void'
     */
    public function down()
    {
        Schema::drop('categories');
    }
}
