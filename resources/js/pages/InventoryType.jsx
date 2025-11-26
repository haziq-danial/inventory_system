import InventoryTypeList from '../components/InventoryTypeList';
import Layout from '../components/Layout';

export default function InventoryType() {
    return (
        <Layout>
            <div className="container mx-auto mt-2 p-4">
                <h2 className="text-2xl font-bold mb-3">Part Type List</h2>
                <InventoryTypeList />
            </div>
        </Layout>
    );
}