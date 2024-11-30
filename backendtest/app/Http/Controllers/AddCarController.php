<?php
namespace App\Http\Controllers;

use App\Models\AddCar;
use Illuminate\Http\Request;
use App\Models\Test;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AddCarController extends Controller
{
    public function testAdd(Request $req)
    {
        // Валідація даних
        $validator = Validator::make($req->all(), [
            'type_of_transport' => 'required|string|max:50',
            'brand' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'runs' => 'required|integer|min:0',
            'body_type' => 'required|string|max:50',
            'region' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'vin_code' => 'required|string|max:20|unique:add_cars,vin_code',
            'verified_vin' => 'required|boolean',
            'is_sold' => 'required|boolean',
            'number_of_owners' => 'required|integer|min:0',
            'phone_owner' => 'required|string|max:15',
            'description' => 'nullable|string|max:3000',
            'gearbox' => 'required|string|max:50',
            'fuel_type' => 'required|string|max:50',
            'fuel_consumption_city' => 'nullable|numeric|min:0',
            'fuel_consumption_highway' => 'nullable|numeric|min:0',
            'fuel_consumption_combined' => 'nullable|numeric|min:0',
            'engine_power' => 'required|integer|min:1',
            'number_of_doors' => 'required|integer|min:0|max:5',
            'color' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'photo_paths' => 'required|file|mimes:jpg,jpeg,png|max:2048',
        ]);
    
        // Повернути помилки валідації, якщо вони є
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Збереження даних
        $test = new Test($req->except('photo_paths'));
        $test->photo_paths = $req->file('photo_paths')->store('products', 'public');
        $test->save();
    
        return response()->json($test, 201);
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
    // Знайти автомобіль
    $test = Test::find($id);

    if (!$test) {
        return response()->json(['error' => 'Car not found'], 404);
    }

    // Валідація даних
    $validator = Validator::make($req->all(), [
        'type_of_transport' => 'string|max:50',
        'brand' => 'string|max:50',
        'model' => 'string|max:50',
        'year' => 'integer|min:1900|max:' . date('Y'),
        'runs' => 'integer|min:0',
        'is_sold' => 'boolean',
        'body_type' => 'string|max:50',
        'region' => 'string|max:100',
        'city' => 'string|max:100',
        'vin_code' => 'string|max:20|unique:add_cars,vin_code,' . $id,
        'verified_vin' => 'boolean',
        'number_of_owners' => 'integer|min:0',
        'phone_owner' => 'string|max:15',
        'description' => 'nullable|string|max:3000',
        'gearbox' => 'string|max:50',
        'fuel_type' => 'string|max:50',
        'fuel_consumption_city' => 'nullable|numeric|min:0',
        'fuel_consumption_highway' => 'nullable|numeric|min:0',
        'fuel_consumption_combined' => 'nullable|numeric|min:0',
        'engine_power' => 'integer|min:1',
        'number_of_doors' => 'integer|min:0|max:5',
        'color' => 'string|max:50',
        'price' => 'numeric|min:0',
        // 'photo_paths' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
    ]);


    
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Оновлення даних
    $test->fill($req->except('photo_paths'));

    // if ($req->hasFile('photo_paths')) {
    //     $test->photo_paths = $req->file('photo_paths')->store('products', 'public');
    // }

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
