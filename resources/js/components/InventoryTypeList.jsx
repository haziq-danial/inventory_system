import { useEffect, useState } from 'react';
import api from '../api';
import InventoryTypeForm from './InventoryTypeForm';

export default function InventoryTypeList() {
    const [inventoryType, setInventoryType] = useState([]);
    const [editingInventoryType, setEditingInventoryType] = useState(null);

    const fetchInventoryType = async () => {
        try {
            const res = await api.get("/inventory-types");
            console.log("API /inventory-types response:", res);
            setInventoryType(res.data.data);
        } catch (error) {
            console.error("Failed to load inventory types:", error);
        }
    };

    useEffect(() => {
        fetchInventoryType();
    }, []);

    const handleEditClick = (inventoryType) => {
        setEditingInventoryType(inventoryType);
        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this part type?")) return;
        try {
            await api.delete(`/inventory-types/${id}`);
            setInventoryType(inventoryType.filter((m) => m.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleSave = (savedInventoryType) => {
        if (editingInventoryType) {
            // Update
            setInventoryType(
                inventoryType.map((m) => (m.id === savedInventoryType.id ? savedInventoryType : m))
            );
            setEditingInventoryType(null);
        } else {
            // Add
            setInventoryType([...inventoryType, savedInventoryType]);
        }
    };

    const handleCancelEdit = () => setEditingInventoryType(null);

    return (
        <div className="overflow-x-auto">
            <InventoryTypeForm
                inventoryType={editingInventoryType}
                onSave={handleSave}
                onCancel={handleCancelEdit}
            />
            <table className="min-w-full text-left rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 ">ID</th>
                        <th className="px-4 py-2 ">Name</th>
                        <th className="px-4 py-2 ">Created At</th>
                        <th className="px-4 py-2 ">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryType.map((m, index) => (
                        <tr key={m.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{m.type_name}</td>
                            <td className="px-4 py-2">{m.created_at}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button onClick={() => handleEditClick(m)} className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition'>Edit</button>
                                <button onClick={() => handleDelete(m.id)} className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition'>Delete</button>
                            </td>
                        </tr>
                    ))}

                    {inventoryType.length === 0 && (
                        <tr>
                            <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                                No part types found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}