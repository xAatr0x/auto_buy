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
        $user= User::where('email',$req->email)->first();
        if(!$user || !Hash::check($req->password,$user->password))
        {
            return ["error"=>"Email or password is not matched"];
        }
        return $user;
    }

    public function sendMessage(Request $request)
    {
        // Auth::id()
        $message = new Message;
        $message->sender_id = 2;
        $message->receiver_id = $request->input('receiver_id');
        $message->content = $request->input('content');
        $message->save();

        return response()->json($message);
    }

    public function getMessages($receiverId)
    {
        $userId = Auth::id();
        $messages = Message::where(function ($query) use ($userId, $receiverId) {
            $query->where('sender_id', $userId)->where('receiver_id', $receiverId);
        })->orWhere(function ($query) use ($userId, $receiverId) {
            $query->where('sender_id', $receiverId)->where('receiver_id', $userId);
        })->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
    }

}
