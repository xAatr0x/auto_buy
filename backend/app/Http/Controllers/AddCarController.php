<?php
namespace App\Http\Controllers;

use App\Models\AddCar;
use Illuminate\Http\Request;

class AddCarController extends Controller
{

    public function addCar(Request $req) 
    {
        $addcar = new AddCar;

        $addcar->type_of_transport = $req->input('type_of_transport');
        $addcar->brand = $req->input('brand');
        $addcar->model = $req->input('model');
        $addcar->year = $req->input('year');
        $addcar->runs = $req->input('runs');
        $addcar->body_type = $req->input('body_type');
        $addcar->region = $req->input('region');
        $addcar->city = $req->input('city');
        $addcar->vin_code = $req->input('vin_code');
        $addcar->verified_vin = $req->input('verified_vin');
        $addcar->number_of_owners = $req->input('number_of_owners');
        $addcar->phone_owner = $req->input('phone_owner');
        $addcar->description = $req->input('description');

        $addcar->gearbox = $req->input('gearbox');
        $addcar->fuel_type = $req->input('fuel_type');
        $addcar->fuel_consumption_city = $req->input('fuel_consumption_city');
        $addcar->fuel_consumption_highway = $req->input('fuel_consumption_highway');
        $addcar->fuel_consumption_combined = $req->input('fuel_consumption_combined');
        $addcar->engine_power = $req->input('engine_power');
        $addcar->number_of_doors = $req->input('number_of_doors');
        $addcar->color = $req->input('color');

        $addcar->price = $req->input('price');

        $addcar->photo_paths = $req->file('photo_paths')->store('cars');
    
        $addcar->save();
        return $addcar;
        // return response()->json($addcar);
    }

    public function list(Request $request)
    {
        $sortField = $request->get('sortField', 'price');
        $sortOrder = $request->get('sortOrder', 'asc');
        $minPrice = $request->get('minPrice', 0);
        $maxPrice = $request->get('maxPrice', PHP_INT_MAX);

        $query = AddCar::whereBetween('price', [$minPrice, $maxPrice]);

        if ($sortField === 'type_of_transport' || $sortField === 'region' || $sortField === 'year' || $sortField === 'verified_vin' || $sortField === 'brand' || $sortField === 'model') {
            $query->orderBy($sortField, $sortOrder);
        }

        if ($sortField !== 'price') {
            $query->orderBy('price', $sortOrder);
        }

        $cars = $query->get();

        return response()->json($cars);
    }

    public function getCarById($id)
    {
        $car = addСar::find($id);

        if (!$car) {
            return response()->json(['error' => 'Car not found'], 404);
        }

        return response()->json($car);
    }
    
    public function test()
    {
        // return response()->json(['message' => 'Маршрут працює!']);
        return 'Маршрут працює!';
    }
}
