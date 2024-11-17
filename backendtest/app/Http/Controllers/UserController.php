<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function register(Request $req)
    {
        $user = new User;
        $user->name= $req->input('name');
        $user->email= $req->input('email');
        $user->number= $req->input('number');
        $user->password= Hash::make($req->input('password'));
        $user->save();

        return $user;
    }

    function login(Request $req)
    {
        $user = User::where('email', $req->email)->first();
        if (!$user || !Hash::check($req->password, $user->password)) {
            return response()->json(['error' => 'Email or password is not matched'], 401);
        }
        return response()->json($user, 200);
    }


    public function sendMessage(Request $request)
    {
        
        if ($request->input('sender_id') == $request->input('receiver_id')) {
            return response()->json(['error' => 'You cannot send a message to yourself.'], 400);
        }

        $message = new Message;
        $message->sender_id = $request->input('sender_id');
        $message->receiver_id = $request->input('receiver_id');
        $message->car_id = $request->input('car_id');
        $message->content = $request->input('content');
        $message->save();

        return response()->json($message);
    }


    public function getMessagesByCarId($carId)
    {
        try {
            // Отримуємо всі повідомлення для конкретного car_id
            $messages = Message::where('car_id', $carId)
                            ->orderBy('created_at', 'asc')
                            ->get();

            // Завантажуємо дані про відправників для кожного повідомлення
            $messages->load('sender');

            return response()->json($messages);
        } catch (\Exception $e) {
            // Якщо сталася помилка, повертаємо відповідь з помилкою
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

public function getMessages($senderId, $receiverId, $carId)
{
    try {
        $messages = Message::where(function ($query) use ($senderId, $receiverId, $carId) {
            $query->where('sender_id', $senderId)
                  ->where('receiver_id', $receiverId)
                  ->where('car_id', $carId);
        })->orWhere(function ($query) use ($senderId, $receiverId, $carId) {
            $query->where('sender_id', $receiverId)
                  ->where('receiver_id', $senderId)
                  ->where('car_id', $carId);
        })->orderBy('created_at', 'asc')->get();

        // Завантажуємо дані про користувачів (відправників) для кожного повідомлення
        $messages->load('sender');

        return response()->json($messages);
    } catch (\Exception $e) {
        // Якщо сталася помилка, повертаємо відповідь з помилкою
        return response()->json(['error' => $e->getMessage()], 500);
    }
}



    // public function getMessages($senderId, $receiverId)
    // {

    //     try {
    //         $messages = Message::where(function ($query) use ($senderId, $receiverId) {
    //             $query->where('sender_id', $senderId)->where('receiver_id', $receiverId);
    //         })->orWhere(function ($query) use ($senderId, $receiverId) {
    //             $query->where('sender_id', $receiverId)->where('receiver_id', $senderId);
    //         })->orderBy('created_at', 'asc')->get();

    //         // Завантажуємо дані про користувачів (відправників) для кожного повідомлення
    //         $messages->load('sender');

    //         return response()->json($messages);
    //     } catch (\Exception $e) {
    //         // Якщо сталася помилка, повертаємо відповідь з помилкою
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    public function getAllMessages($receiverId)
    {
        try {
            // Отримуємо всі повідомлення для конкретного отримувача
            $messages = Message::where('receiver_id', $receiverId)
                            ->orderBy('created_at', 'asc')
                            ->get();

            // Завантажуємо дані про відправників для кожного повідомлення
            $messages->load('sender');

            return response()->json($messages);
        } catch (\Exception $e) {
            // Якщо сталася помилка, повертаємо відповідь з помилкою
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Car not found'], 404);
        }

        return response()->json($user);
    }

    public function getUserByPhone($phone)
    {
        $user = User::where('number', $phone)->first();

        if ($user) {
            return response()->json(['id' => $user->id]);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }
}
