<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    protected $fillable = [
        'manufacturer_name'
    ];

    public function part_info() {
        return $this->hasMany(Inventory::class);
    }
}
