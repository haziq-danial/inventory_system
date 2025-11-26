import Layout from '../components/Layout';
import ManufacturerList from '../components/ManufacurerList';


export default function Manufacturer() {
    return (
        <Layout>
            <div className="container mx-auto mt-2 p-4">
                <h2 className="text-2xl font-bold mb-3">Manufacturer List</h2>

                <ManufacturerList />
            </div>
        </Layout>
    );
}