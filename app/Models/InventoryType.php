<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryType extends Model
{
    protected $fillable = [
        'type_name'
    ];

    public function inventory() {
        return $this->hasMany(Inventory::class);
    }
}
