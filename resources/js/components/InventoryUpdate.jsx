import { useState, useEffect } from "react";
import api from "../api";

export default function InventoryUpdate({ inventory, onSave, onCancel }) {
    const [manufacturers, setManufacturers] = useState([]);
    const [types, setTypes] = useState([]);

    const [form, setForm] = useState({
        manufacturer_id: "",
        inventory_type_id: "",
        part_number: "",
        footprint: "",
        quantity: "",
    });

    useEffect(() => {
        (async () => {
            const m = await api.get("/manufacturers");
            setManufacturers(m.data.data || []);

            const t = await api.get("/inventory-types");
            setTypes(t.data.data || []);
        })();
    }, []);

    useEffect(() => {
        if (inventory) {
            setForm({
                manufacturer_id: inventory.manufacturer_id,
                inventory_type_id: inventory.inventory_type_id,
                part_number: inventory.part_number,
                footprint: inventory.footprint,
                quantity: inventory.quantity,
            });
        } else {
            setForm({
                manufacturer_id: "",
                inventory_type_id: "",
                part_number: "",
                footprint: "",
                quantity: "",
            });
        }
    }, [inventory]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...form };

        try {
            let res;
            if (inventory) {
                res = await api.put(`/inventories/${inventory.id}`, payload);
            } else {
                res = await api.post(`/inventories`, payload);
            }

            onSave(res.data.data || res.data);
        } catch (err) {
            console.error("Save failed:", err);
        }
    };

    return (
        <div className="bg-white p-4 shadow rounded mb-4">
            <h3 className="font-bold mb-3">
                {inventory ? "Edit Inventory" : "Add Inventory"}
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Manufacturer */}
                <select
                    name="manufacturer_id"
                    value={form.manufacturer_id}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                >
                    <option value="">Select Manufacturer</option>
                    {manufacturers.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.manufacturer_name}
                        </option>
                    ))}
                </select>

                {/* Type */}
                <select
                    name="inventory_type_id"
                    value={form.inventory_type_id}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                >
                    <option value="">Select Type</option>
                    {types.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.type_name}
                        </option>
                    ))}
                </select>

                {/* Part Number */}
                <input
                    type="text"
                    name="part_number"
                    value={form.part_number}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    placeholder="Part Number"
                    required
                />

                {/* Footprint */}
                <input
                    type="text"
                    name="footprint"
                    value={form.footprint}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    placeholder="Footprint"
                    required
                />

                {/* Quantity */}
                <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    placeholder="Quantity"
                    required
                />

                <div className="col-span-2 flex gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {inventory ? "Update" : "Add"}
                    </button>

                    {inventory && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
