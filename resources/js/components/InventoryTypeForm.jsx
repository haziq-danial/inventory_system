import { useState, useEffect } from "react";
import api from "../api";

export default function InventoryTypeForm({ inventoryType, onSave, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (inventoryType) setName(inventoryType.type_name ?? "");
    else setName("");
  }, [inventoryType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { type_name: name }; // match DB column
    try {
      if (inventoryType) {
        // Edit
        const res = await api.put(`/inventory-types/${inventoryType.id}`, payload );
        onSave(res.data.data);
      } else {
        // Create
        const res = await api.post("/inventory-types", payload );
        onSave(res.data.data);
      }
      setName("");
    } catch (error) {
      console.error("Error saving part type:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-bold mb-3">{inventoryType ? "Edit Part Type" : "Add Part Type"}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 mb-3 md:mb-0 grow"
          placeholder="Part Type"
          required
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {inventoryType ? "Update" : "Add"}
          </button>
          {inventoryType && (
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
