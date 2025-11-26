<?php

namespace App\Http\Controllers;

use App\Http\Resources\InventoryTypeResource;
use App\Models\InventoryType;
use Illuminate\Http\Request;

class InventoryTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return InventoryTypeResource::collection(InventoryType::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_name' => 'required|string|max:255',
        ]);

        $inventory_type = InventoryType::create($validated);

        return new InventoryTypeResource($inventory_type);
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryType $inventory_type)
    {
        return new InventoryTypeResource($inventory_type);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryType $inventory_type)
    {
        $validate = $request->validate([
            'type_name' => 'required|string|max:255'
        ]);

        $inventory_type->update($validate);

        return new InventoryTypeResource($inventory_type);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryType $inventory_type)
    {
        $inventory_type->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
