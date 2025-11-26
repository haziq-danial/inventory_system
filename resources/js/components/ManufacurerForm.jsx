import { useState, useEffect } from "react";
import api from "../api";

export default function ManufacturerForm({ manufacturer, onSave, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (manufacturer) setName(manufacturer.manufacturer_name ?? "");
    else setName("");
  }, [manufacturer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { manufacturer_name: name }; // match DB column
    try {
      if (manufacturer) {
        // Edit
        const res = await api.put(`/manufacturers/${manufacturer.id}`, payload );
        onSave(res.data.data);
      } else {
        // Create
        const res = await api.post("/manufacturers", payload );
        onSave(res.data.data);
      }
      setName("");
    } catch (error) {
      console.error("Error saving manufacturer:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-bold mb-3">{manufacturer ? "Edit Manufacturer" : "Add Manufacturer"}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 mb-3 md:mb-0 grow"
          placeholder="Manufacturer Name"
          required
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {manufacturer ? "Update" : "Add"}
          </button>
          {manufacturer && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
