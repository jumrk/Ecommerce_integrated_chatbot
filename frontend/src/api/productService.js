import axios from "axios";
const API_URL = "http://localhost:5000/api/products";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const getProducts = async () => {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}