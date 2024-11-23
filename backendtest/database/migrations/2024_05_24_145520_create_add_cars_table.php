<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('add_cars', function (Blueprint $table) {
            $table->id();
            $table->string('type_of_transport');
            $table->string('brand');
            $table->string('model');
            $table->integer('year');
            $table->integer('runs');
            $table->string('body_type');
            $table->string('region');
            $table->string('city');
            $table->string('is_sold');
            $table->string('vin_code');
            $table->boolean('verified_vin')->default(false);
            $table->integer('number_of_owners');
            $table->string('phone_owner');
            $table->text('description')->nullable();
            $table->string('gearbox');
            $table->string('fuel_type');
            $table->float('fuel_consumption_city');
            $table->float('fuel_consumption_highway');
            $table->float('fuel_consumption_combined');
            $table->integer('engine_power');
            $table->integer('number_of_doors');
            $table->string('color');
            $table->decimal('price', 10, 2);
            $table->string('photo_paths')->nullable();
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
        Schema::dropIfExists('add_cars');
    }
}
