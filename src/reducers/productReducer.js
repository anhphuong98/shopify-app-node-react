import { productConstants } from "../actionTypes"

const initState = {
    isLoading: false,
    list: []
}

function findIndex(array, id) {
    let result = -1;
    array.map((x, index) => {
        if (x.id === id) {
            result = index;
        }
    });
    return result;
}

export function product(state = initState, action) {
    let index = -1;
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
        case productConstants.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
        case productConstants.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: false
            }
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload.products
            }
        case productConstants.UPDATE_PRODUCT_SUCCESS:
            index = findIndex(state.list, action.payload.product.id);
            if (index != -1) {
                state.list[index] = action.payload.product;
            }
            return {
                ...state,
                isLoading: false
            }
        default:
            return { ...state }
    }
}