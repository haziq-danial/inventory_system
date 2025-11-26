<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\InventoryResource;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return InventoryResource::collection(Inventory::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'manufacturer_id' => 'required|exists:manufacturers,id',
            'inventory_type_id' => 'required|exists:inventory_types,id',
            'part_number' => 'required|string|max:255',
            'footprint' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
        ]);

        $inventory = Inventory::create($validated);

        return new InventoryResource($inventory);
    }

    /**
     * Store inventory in bulk / one
     *
     * @param Request $request Request object
     * @return Response $json Response status
     **/
    public function storeMultiple(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.manufacturer_id' => 'required|exists:manufacturers,id',
            'items.*.inventory_type_id' => 'required|exists:inventory_types,id',
            'items.*.part_number' => 'required|string',
            'items.*.footprint' => 'required|string',
            'items.*.quantity' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $rows = [];

        foreach ($request->items as $inv) {
            $rows[] = [
                'manufacturer_id'   => $inv['manufacturer_id'],
                'inventory_type_id' => $inv['inventory_type_id'],
                'part_number'       => $inv['part_number'],
                'footprint'         => $inv['footprint'],
                'quantity'          => $inv['quantity'],
                'created_at'        => now(),
                'updated_at'        => now(),
            ];
        }

        $created = Inventory::insert($rows);

        return response()->json([
            'message' => 'Inventories created successfully',
            'count' => count($request->items),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        return new InventoryResource($inventory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $validate = $request->validate([
            'manufacturer_id' => 'required|exists:manufacturers,id',
            'inventory_type_id' => 'required|exists:inventory_types,id',
            'part_number' => 'required|string|max:255',
            'footprint' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
        ]);

        $inventory->update($validate);

        return new InventoryResource($inventory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        $inventory->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
