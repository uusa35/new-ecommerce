<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTimingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timings', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('start');
            $table->time('end');
            $table->boolean('allow_multi_select')->default(false);
            $table->string('notes_ar')->nullable();
            $table->string('notes_en')->nullable();
            $table->integer('order')->nullable();
            $table->integer('limit')->default(99);
            $table->boolean('active')->default(1);

            $table->foreignId('service_id')->constrained('services')->cascadeOnDelete();

            $table->timestamps();
        });
    }
    /*
     * doing a service that has a specific date and specific time
     * timings : working days
     *
     * Sun , Mon , tue , wed , thur : from 8 to 3
     * Friday is off
     * Saturday is off
     *
     * */

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('timings');
    }
}
