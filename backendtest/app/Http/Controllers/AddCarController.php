<?php
namespace App\Http\Controllers;

use App\Models\AddCar;
use Illuminate\Http\Request;
use App\Models\Test;
use App\Models\User;

class AddCarController extends Controller
{
  function testAdd(Request $req){
        $test = new Test;
        $test->type_of_transport = $req->input('type_of_transport');
        $test->brand = $req->input('brand');
        $test->model = $req->input('model');
        $test->year = $req->input('year');
        $test->runs = $req->input('runs');
        $test->body_type = $req->input('body_type');
        $test->region = $req->input('region');
        $test->city = $req->input('city');
        $test->vin_code = $req->input('vin_code');
        $test->verified_vin = $req->input('verified_vin');
        $test->number_of_owners = $req->input('number_of_owners');
        $test->phone_owner = $req->input('phone_owner');
        $test->description = $req->input('description');

        $test->gearbox = $req->input('gearbox');
        $test->fuel_type = $req->input('fuel_type');
        $test->fuel_consumption_city = $req->input('fuel_consumption_city');
        $test->fuel_consumption_highway = $req->input('fuel_consumption_highway');
        $test->fuel_consumption_combined = $req->input('fuel_consumption_combined');
        $test->engine_power = $req->input('engine_power');
        $test->number_of_doors = $req->input('number_of_doors');
        $test->color = $req->input('color');

        $test->price = $req->input('price');
        $test->photo_paths = $req->file('photo_paths')->store('products', 'public');
        $test->save();
        return $test;
        
  }

// public function testAdd(Request $request)
// {
//     // Створюємо новий запис тестової машини
//     $test = new Test;
//     $test->type_of_transport = $request->input('type_of_transport');
//     $test->brand = $request->input('brand');
//     $test->model = $request->input('model');
//     $test->year = $request->input('year');
//     $test->runs = $request->input('runs');
//     $test->body_type = $request->input('body_type');
//     $test->region = $request->input('region');
//     $test->city = $request->input('city');
//     $test->vin_code = $request->input('vin_code');
//     $test->verified_vin = $request->input('verified_vin');
//     $test->number_of_owners = $request->input('number_of_owners');
//     $test->phone_owner = $request->input('phone_owner');
//     $test->description = $request->input('description');
//     $test->gearbox = $request->input('gearbox');
//     $test->fuel_type = $request->input('fuel_type');
//     $test->fuel_consumption_city = $request->input('fuel_consumption_city');
//     $test->fuel_consumption_highway = $request->input('fuel_consumption_highway');
//     $test->fuel_consumption_combined = $request->input('fuel_consumption_combined');
//     $test->engine_power = $request->input('engine_power');
//     $test->number_of_doors = $request->input('number_of_doors');
//     $test->color = $request->input('color');
//     $test->price = $request->input('price');

//     // Зберігаємо запис тестової машини
//     $test->save();

//     // Зберігаємо фотографії
//     $photoPaths = [];
//     foreach ($request->file('photo_paths') as $file) {
//         $path = $file->store('products', 'public');
//         $photoPaths[] = $path;
//     }

//     // Прив'язуємо фотографії до запису тестової машини
//     $test->photo_paths = $photoPaths;
//     $test->save();

//     return $test;
// }

  public function update(Request $req, $id)
{
    $test = Test::find($id);

    if (!$test) {
        return response()->json(['error' => 'Car not found'], 404);
    }

    $test->type_of_transport = $req->input('type_of_transport');
    $test->brand = $req->input('brand');
    $test->model = $req->input('model');
    $test->year = $req->input('year');
    $test->runs = $req->input('runs');
    $test->body_type = $req->input('body_type');
    $test->region = $req->input('region');
    $test->city = $req->input('city');
    $test->vin_code = $req->input('vin_code');
    $test->verified_vin = $req->input('verified_vin');
    $test->number_of_owners = $req->input('number_of_owners');
    $test->phone_owner = $req->input('phone_owner');
    $test->description = $req->input('description');

    $test->gearbox = $req->input('gearbox');
    $test->fuel_type = $req->input('fuel_type');
    $test->fuel_consumption_city = $req->input('fuel_consumption_city');
    $test->fuel_consumption_highway = $req->input('fuel_consumption_highway');
    $test->fuel_consumption_combined = $req->input('fuel_consumption_combined');
    $test->engine_power = $req->input('engine_power');
    $test->number_of_doors = $req->input('number_of_doors');
    $test->color = $req->input('color');

    $test->price = $req->input('price');

    if ($req->hasFile('photo_paths')) {
        $test->photo_paths = $req->file('photo_paths')->store('products', 'public');
    }

    $test->save();

    return response()->json($test);
}

public function updateWithNotification(Request $req, $id)
    {
        $test = Test::find($id);

        if (!$test) {
            return response()->json(['error' => 'Car not found'], 404);
        }

        $test->fill($req->all());

        if ($req->hasFile('photo_paths')) {
            $test->photo_paths = $req->file('photo_paths')->store('products', 'public');
        }

        $user = User::where('number', $req->input('phone_owner'))->first();

        if (!$user) {
            return response()->json(['error' => 'Owner not found'], 404);
        }

        if ($req->input('verified_vin') == 1) {
            $message = "Ваш автомобіль було додано до списку перевірених VIN.";
            Notification::create([
                'user_id' => $user->id,
                'message' => $message,
            ]);
        }

        $test->save();

        return response()->json($test);
    }


// public function list(Request $request)
// {
//     $sortField = $request->get('sortField', 'price');
//     $sortOrder = $request->get('sortOrder', 'asc');
//     $minPrice = $request->get('minPrice', 0);
//     $maxPrice = $request->get('maxPrice', PHP_INT_MAX);
//     $verifiedVin = $request->get('verified_vin', null); 

//     $query = AddCar::whereBetween('price', [$minPrice, $maxPrice]);

//     if (!is_null($verifiedVin)) {
//         $query->where('verified_vin', $verifiedVin);
//     }

//     if (in_array($sortField, ['type_of_transport', 'region', 'year', 'verified_vin', 'brand', 'model'])) {
//         $query->orderBy($sortField, $sortOrder);
//     }

//     if ($sortField !== 'price') {
//         $query->orderBy('price', $sortOrder);
//     }

//     $cars = $query->get();

//     if ($cars->isEmpty()) {
//         return response()->json(['error' => 'Car not found'], 404);
//     }

//     return response()->json($cars);
// }

public function list(Request $request)
{
    $sortField = $request->get('sortField', 'price');
    $sortOrder = $request->get('sortOrder', 'asc');
    $minPrice = $request->get('minPrice', 0);
    $maxPrice = $request->get('maxPrice', PHP_INT_MAX);
    $verifiedVin = $request->get('verified_vin', null);
    $type = $request->get('type', null);
    $region = $request->get('region', null);
    $brand = $request->get('brand', null);
    $model = $request->get('model', null);
    $yearFrom = $request->get('year_from', null);
    $yearTo = $request->get('year_to', null);

    $query = AddCar::whereBetween('price', [$minPrice, $maxPrice]);

    if (!is_null($verifiedVin)) {
        $query->where('verified_vin', $verifiedVin);
    }
    if (!is_null($type)) {
        $query->where('type_of_transport', $type);
    }
    if (!is_null($region)) {
        $query->where('region', $region);
    }
    if (!is_null($brand)) {
        $query->where('brand', $brand);
    }
    if (!is_null($model)) {
        $query->where('model', $model);
    }
    if (!is_null($yearFrom) && !is_null($yearTo)) {
        $query->whereBetween('year', [$yearFrom, $yearTo]);
    }

    if (in_array($sortField, ['type_of_transport', 'region', 'year', 'verified_vin', 'brand', 'model', 'price'])) {
        $query->orderBy($sortField, $sortOrder);
    } else {
        $query->orderBy('price', $sortOrder);
    }

    $cars = $query->get();

    if ($cars->isEmpty()) {
        return response()->json(['error' => 'Car not found'], 404);
    }

    return response()->json($cars);
}
    public function getCarById($id)
    {
        $test = Test::find($id);

        if (!$test) {
            return response()->json(['error' => 'Car not found'], 404);
        }

        return response()->json($test);
    }
    
    public function test()
    {
        return response()->json(['message' => 'Маршрут працює!']);
    }
}
