import { useState, useEffect } from "react";
import api from "../api";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { ChevronsLeft } from "lucide-react";

export default function InventoryBulkForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [types, setTypes] = useState([]);

    const [items, setItems] = useState([
        { manufacturer_id: "", inventory_type_id: "", part_number: "", footprint: "", quantity: 0 }
    ]);

    useEffect(() => {
        api.get("/manufacturers").then(res => setManufacturers(res.data.data));
        api.get("/inventory-types").then(res => setTypes(res.data.data));
    }, []);

    const handleChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addRow = () => {
        setItems([
            ...items,
            { manufacturer_id: "", inventory_type_id: "", part_number: "", footprint: "", quantity: 0 }
        ]);
        console.log(items);
    };

    const removeRow = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(items);
            await api.post("/inventories/bulk", { items });
            alert("Inventories added!");
            setItems([
                { manufacturer_id: "", inventory_type_id: "", part_number: "", footprint: "", quantity: 0 }
            ]);
        } catch (err) {
            console.error(err);
            alert("Error saving inventories");
        }
    };

    return (
        <Layout>
            <div className="p-6 bg-white shadow rounded">
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-xl font-bold mb-4">Add Multiple Inventory Items</h2>
                    <Link
                        to='/inventory'
                        className="flex items-center gap-3 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <ChevronsLeft size={18}/>Main Inventory List
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-6 gap-3 items-center border p-3 rounded">

                            {/* Manufacturer */}
                            <select
                                value={item.manufacturer_id}
                                onChange={(e) => handleChange(index, "manufacturer_id", e.target.value)}
                                className="border rounded p-2"
                                required
                            >
                                <option value="">Manufacturer</option>
                                {manufacturers.map((m) => (
                                    <option key={m.id} value={m.id}>{m.manufacturer_name}</option>
                                ))}
                            </select>

                            {/* Type */}
                            <select
                                value={item.inventory_type_id}
                                onChange={(e) => handleChange(index, "inventory_type_id", e.target.value)}
                                className="border rounded p-2"
                                required
                            >
                                <option value="">Type</option>
                                {types.map((t) => (
                                    <option key={t.id} value={t.id}>{t.type_name}</option>
                                ))}
                            </select>

                            <input
                                className="border rounded p-2"
                                placeholder="Part Number"
                                value={item.part_number}
                                onChange={(e) => handleChange(index, "part_number", e.target.value)}
                                required
                            />

                            <input
                                className="border rounded p-2"
                                placeholder="Footprint"
                                value={item.footprint}
                                onChange={(e) => handleChange(index, "footprint", e.target.value)}
                                required
                            />

                            <input
                                type="number"
                                className="border rounded p-2"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={(e) => handleChange(index, "quantity", e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => removeRow(index)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="flex space-x-4">

                        <button type="button" onClick={addRow} className="bg-green-600 text-white p-2 rounded">
                            + Add Row
                        </button>

                        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                            Save All
                        </button>
                    </div>
                </form>
            </div>

        </Layout>
    );
}
