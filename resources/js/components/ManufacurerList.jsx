import Layout from '../components/Layout';
import ManufacturerForm from './ManufacurerForm';
import { useEffect, useState } from 'react';
import api from '../api';

export default function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);
    const [editingManufacturer, setEditingManufacturer] = useState(null);

    const fetchManufacturers = async () => {
        try {
            const res = await api.get("/manufacturers");
            console.log("API /manufacturers response:", res);
            setManufacturers(res.data.data);
        } catch (error) {
            console.error("Failed to load manufacturers:", error);
        }
    };

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const handleEditClick = (manufacturer) => {
        setEditingManufacturer(manufacturer);
        window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this manufacturer?")) return;
        try {
            await api.delete(`/manufacturers/${id}`);
            setManufacturers(manufacturers.filter((m) => m.id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleSave = (savedManufacturer) => {
        if (editingManufacturer) {
            // Update
            setManufacturers(
                manufacturers.map((m) => (m.id === savedManufacturer.id ? savedManufacturer : m))
            );
            setEditingManufacturer(null);
        } else {
            // Add
            setManufacturers([...manufacturers, savedManufacturer]);
        }
    };

    const handleCancelEdit = () => setEditingManufacturer(null);

    return (
        <div className="overflow-x-auto">
            <ManufacturerForm
                manufacturer={editingManufacturer}
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
                    {manufacturers.map((m, index) => (
                        <tr key={m.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{m.manufacturer_name}</td>
                            <td className="px-4 py-2">{m.created_at}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button onClick={() => handleEditClick(m)} className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition'>Edit</button>
                                <button onClick={() => handleDelete(m.id)} className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition'>Delete</button>
                            </td>
                        </tr>
                    ))}

                    {manufacturers.length === 0 && (
                        <tr>
                            <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                                No manufacturers found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}