import axios from "axios";
import { sendRequest } from "../helpers/sendRequest";
export const productServices = {
    getAllProducts,
    deleteProduct,
    handleEditProduct
}

function getAllProducts(query) {
    return sendRequest({
        method: 'GET',
        url: '/shopify/api/products.json',
        params: query
    }, false, false, "Get all product success", "Get all product failed");
}

function deleteProduct(id) {
    return sendRequest({
        method: 'DELETE',
        url: `/shopify/api/products/${id}.json`,
    }, true, true, "Delete product success", "Delete product failed");
}

function handleEditProduct(id, data) {
    return sendRequest({
        method: 'PUT',
        url: `/shopify/api/products/${id}.json`,
        data
    }, true, true, "Edit product success", "Edit product failed");
}