import Layout from '../components/Layout';
import ManufacturerForm from './ManufacurerForm';
import { useEffect, useState } from 'react';
import api from '../api';
import InventoryUpdate from './InventoryUpdate';

export default function InventoryList() {
    const [inventories, setInventories] = useState([]);
    const [editingInventory, setEditingInventory] = useState(null);

    const fetchInventories = async () => {
        try {
            const res = await api.get("/inventories");
            console.log("API /inventories response:", res);
            setInventories(res.data.data);
        } catch (error) {
            console.error("Failed to load inventories:", error);
        }
    };

    useEffect(() => {
        fetchInventories();
    }, []);

    const handleEditClick = (inventory) => {
        setEditingInventory(inventory);
        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this inventory?")) return;
        try {
            await api.delete(`/inventories/${id}`);
            setInventories(inventories.filter((m) => m.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleSave = (savedInventory) => {
        if (editingInventory) {
            // Update
            setInventories(
                inventories.map((m) => (m.id === savedInventory.id ? savedInventory : m))
            );
            setEditingInventory(null);
        } else {
            // Add
            setInventories([...inventories, savedInventory]);
        }
    };

    const handleCancelEdit = () => setEditingInventory(null);

    return (
        <div className="overflow-x-auto">

            <InventoryUpdate
                inventory={editingInventory}
                onSave={handleSave}
                onCancel={handleCancelEdit}
            />

            <table className="min-w-full text-left rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 ">ID</th>
                        <th className="px-4 py-2 ">Manufacturer</th>
                        <th className="px-4 py-2 ">Part Type</th>
                        <th className="px-4 py-2 ">Part Number</th>
                        <th className="px-4 py-2 ">Footprint</th>
                        <th className="px-4 py-2 ">Quantity</th>
                        <th className="px-4 py-2 ">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.map((m, index) => (
                        <tr key={m.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{m.manufacturer}</td>
                            <td className="px-4 py-2">{m.part_type}</td>
                            <td className="px-4 py-2">{m.footprint}</td>
                            <td className="px-4 py-2">{m.quantity}</td>
                            <td className="px-4 py-2">{m.created_at}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button onClick={() => handleEditClick(m)} className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition'>Edit</button>
                                <button onClick={() => handleDelete(m.id)} className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition'>Delete</button>
                            </td>
                        </tr>
                    ))}

                    {inventories.length === 0 && (
                        <tr>
                            <td colSpan="7" className="px-4 py-3 text-center text-gray-500">
                                No inventories found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}