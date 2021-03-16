import { productConstants } from "../actionTypes"
import { productServices } from "../services/productServices";

export const productActions = {
    getAllProducts,
    deleteProduct,
    handleEditProduct
}

function getAllProducts(query) {
    return dispatch => {
        dispatch({
            type: productConstants.GET_ALL_PRODUCTS_REQUEST
        });
        productServices.getAllProducts(query)
            .then((res) => {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: res.data
                });
            }).catch((error) => {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                    error
                });
            })
    }
}

function deleteProduct(id) {
    return dispatch => {
        dispatch({
            type: productConstants.DELETE_PRODUCT_REQUEST
        });
        productServices.deleteProduct(id)
            .then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.log(error.message);
            })
    }
}

function handleEditProduct(id, data) {
    return dispatch => {
        dispatch({
            type: productConstants.UPDATE_PRODUCT_REQUEST
        })
        productServices.handleEditProduct(id, data)
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: productConstants.UPDATE_PRODUCT_SUCCESS,
                    payload: res.data
                });
            }).catch((error) => {
                dispatch({
                    type: productConstants.UPDATE_PRODUCT_FAILURE,
                    error
                })
            });
    }
}