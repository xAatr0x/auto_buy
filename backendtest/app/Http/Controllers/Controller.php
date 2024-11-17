<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}


    // public function addCar(Request $req) 
    // {
    //     $addcar = new AddCar;

    //     $addcar->brand = $req->input('brand');
    //     $addcar->year = $req->input('year');
    //     $addcar->engine = $req->input('engine');
    //     $addcar->gearbox = $req->input('gearbox');
    //     $addcar->color = $req->input('color');
    //     $addcar->reasons = $req->input('reasons');
    //     $addcar->locations = $req->input('locations');
    //     $addcar->runs = $req->input('runs');
    //     $addcar->number_of_owners = $req->input('number_of_owners');

    //     $addcar->vin_code = $req->input('vin_code');

    //     $addcar->price = $req->input('price');
    //     $addcar->phone_owner = $req->input('phone_owner');

    //     if ($req->hasFile('file')) {
    //         $addcar->file_path = $req->file('file')->store('addcar');
    //     }

    //     $addcar->save();

    //     return response()->json($addcar);
    // }

    // if ($req->hasFile('photos')) {
        //     $files = $req->file('photos');
        //     $filePaths = [];

        //     foreach ($files as $file) {
        //         $filePaths[] = $file->store('photos');
        //     }

        //     $addcar->photo_paths = json_encode($filePaths);
        // }

        // if ($req->hasFile('file')) {
        //     $addcar->photo_paths = $req->file('file')->store('photos');
        // }

        // $photoPaths = [];
        // if ($req->hasFile('photo_paths')) {
        //     foreach ($req->file('photo_paths') as $file) {
        //         $photoPath = $file->store('cars');
        //         $photoPaths[] = $photoPath;
        //     }
        // }

        // $addcar->photo_paths = json_encode($photoPaths);