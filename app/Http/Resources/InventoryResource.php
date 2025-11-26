<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'manufacturer' => $this->manufacturer->manufacturer_name ?? 'none',
            'part_type' => $this->inventoryType->type_name ?? 'none',
            'part_number' => $this->part_number,
            'footprint' => $this->footprint,
            'quantity' => $this->quantity,
            'created_at' => $this->created_at->format('Y-m-d H:i:s') ?? 'none'
        ];
    }
}
