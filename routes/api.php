<?php

use App\Http\Controllers\Api\V1\InventoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ManufacturerController;
use App\Http\Controllers\InventoryTypeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    Route::apiResource('manufacturers', ManufacturerController::class);
    Route::apiResource('inventory-types', InventoryTypeController::class);
    Route::apiResource('inventories', InventoryController::class);
    Route::post('inventories/bulk', [InventoryController::class, 'storeMultiple']);

});
