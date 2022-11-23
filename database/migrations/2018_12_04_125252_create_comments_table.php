<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('content')->nullable();
            $table->string('file')->nullable();
            $table->boolean('active')->default(1);
            $table->boolean('viewed')->nullable();
            $table->integer('likes')->nullable();

            $table->foreignId('user_id')->references('id')->on('users');
            $table->integer('session_id')->unsigned()->nullable(); // user_id + commentable_id
            $table->morphs('commentable');
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
        Schema::drop('comments');
    }
}
