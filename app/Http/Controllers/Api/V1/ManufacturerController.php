<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ManufacturerResource;
use App\Models\Manufacturer;
use Illuminate\Http\Request;


class ManufacturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ManufacturerResource::collection(Manufacturer::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'manufacturer_name' => 'required|string|max:255',
        ]);

        $manufacturer = Manufacturer::create($validated);

        return new ManufacturerResource($manufacturer);
    }

    /**
     * Display the specified resource.
     */
    public function show(Manufacturer $manufacturer)
    {
        return new ManufacturerResource($manufacturer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Manufacturer $manufacturer)
    {
        $validate = $request->validate([
            'manufacturer_name' => 'required|string|max:255'
        ]);

        $manufacturer->update($validate);

        return new ManufacturerResource($manufacturer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Manufacturer $manufacturer)
    {
        $manufacturer->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
