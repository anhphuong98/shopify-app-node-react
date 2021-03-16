import axios from "axios";
export const productServices = {
    getAllProducts,
    deleteProduct,
    handleEditProduct
}

function getAllProducts(query) {
    return axios({
        method: 'GET',
        url: '/shopify/api/products.json',
        params: query
    });
}

function deleteProduct(id) {
    console.log(id);
    return axios({
        method: 'DELETE',
        url: `/shopify/api/products/${id}.json`,
    });
}

function handleEditProduct(id, data) {
    return axios({
        method: 'PUT',
        url: `/shopify/api/products/${id}.json`,
        data
    });
}