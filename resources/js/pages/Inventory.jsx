import { Link } from 'react-router-dom';
import InventoryList from '../components/InventoryList';
import Layout from '../components/Layout';

export default function Inventory() {
    return (
        <Layout>
            <div className="container mx-auto mt-2 p-4">
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-2xl font-bold mb-3">Inventory List</h2>
                    <Link
                        to='/inventory/add'
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add Inventories
                    </Link>
                </div>
                <InventoryList />
            </div>
        </Layout>
    );
}