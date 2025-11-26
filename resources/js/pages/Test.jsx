import { useEffect } from "react";
import api from "../api";
import Layout from "../components/Layout";

export default function Test() {

    const testFunction = async () => {
        try {
            const payload = { manufacturer_name: "toyota" }; // match DB column
            await api.post("/manufacturers", payload);
        } catch (error) {
            console.error("Failed to post manufacturers:", error);
        }
    };

    useEffect(() => {
        testFunction();
    }, []);

    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
        </Layout>
    );
}