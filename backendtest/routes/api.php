<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AddCarController;
use App\Http\Controllers\CharController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('getUserByPhone/{phone}', [UserController::class, 'getUserByPhone']);
Route::post('/sendMessage', [UserController::class, 'sendMessage']);
Route::get('getMessages/{senderId}/{receiverId}/{carId}', [UserController::class, 'getMessages']);
Route::get('getAllMessages/{receiverId}', [UserController::class, 'getAllMessages']);
Route::get('getMessagesByCarId/{carId}', [UserController::class, 'getMessagesByCarId']);
//
Route::post('testAdd', [AddCarController::class, 'testAdd']);
//
// Route::post('addCar', [AddCarController::class, 'addCar']);
Route::get('list',[AddCarController::class,'list']);
Route::get('/car/{id}', [AddCarController::class, 'getCarById']);
Route::get('/test', [AddCarController::class, 'test']);
Route::put('/cars/{id}', [AddCarController::class, 'update']);
Route::put('/cars/{id}/with-notification', [AddCarController::class, 'updateWithNotification']);


