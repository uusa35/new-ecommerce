<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSlidesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slides', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->string('caption_ar')->nullable();
            $table->string('caption_en')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('notes_ar')->nullable();
            $table->text('notes_en')->nullable();
            $table->boolean('active')->default(1);
            $table->integer('order')->nullable();
            $table->string('image')->nullable();
            $table->string('file')->nullable();
            $table->string('url')->nullable();
            $table->boolean('on_home')->default(false);
            $table->boolean('is_video')->default(false);
            $table->boolean('is_intro')->default(false);
            $table->string('type')->nullable();
            // used for Deep Linking
            $table->foreignId('category_id')->nullable()->constrained();
            $table->foreignId('product_id')->nullable()->constrained();
            $table->foreignId('service_id')->nullable()->constrained();
            $table->foreignId('book_id')->nullable()->constrained();
            $table->foreignId('course_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained();

            $table->morphs('slidable');

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
        Schema::drop('slides');
    }
}
