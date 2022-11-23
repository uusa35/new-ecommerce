<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
ini_set('memory_limit', '-1');
class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->string('caption_ar')->nullable();
            $table->string('caption_en')->nullable();
            $table->boolean('is_admin')->default(false);
            $table->boolean('is_super')->default(false);
            $table->boolean('is_client')->default(false);
            $table->boolean('is_company')->default(false);
            $table->boolean('is_designer')->default(false); // == clients
            $table->boolean('is_celebrity')->default(false); // == partners
            $table->boolean('is_author')->default(false);
            $table->boolean('is_visible')->default(false);
            $table->boolean('is_driver')->default(false);
            $table->boolean('active')->default(true);
            $table->integer('order')->nullable();
            $table->string('color')->nullable();
            $table->string('image')->nullable();
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
        Schema::dropIfExists('roles');
    }
}
