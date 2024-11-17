<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AddCarController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/sendMessage', [UserController::class, 'sendMessage']);
Route::get('/getMessages/{receiverId}', [UserController::class, 'getMessages']);

Route::post('addCar', [AddCarController::class, 'addCar']);
Route::get('list',[AddCarController::class,'list']);
Route::get('car/{id}', [AddCarController::class, 'getCarById']);

Route::get('/test', [AddCarController::class, 'test']);


