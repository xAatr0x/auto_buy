<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddCar extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_of_transport',
        'brand',
        'model',
        'year',
        'runs',
        'body_type',
        'region',
        'city',
        'vin_code',
        'verified_vin',
        'number_of_owners',
        'phone_owner',
        'description',
        'gearbox',
        'fuel_type',
        'fuel_consumption_city',
        'fuel_consumption_highway',
        'fuel_consumption_combined',
        'engine_power',
        'number_of_doors',
        'color',
        'price',
        'photo_paths'
    ];

    public $timestamps = true;
}
