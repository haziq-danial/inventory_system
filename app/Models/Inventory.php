<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $fillable = [
        'manufacturer_id',
        'inventory_type_id',
        'part_number',
        'footprint',
        'quantity'
    ];

    public function manufacturer() {
        return $this->belongsTo(Manufacturer::class);
    }

    public function inventoryType() {
        return $this->belongsTo(InventoryType::class);
    }
}
