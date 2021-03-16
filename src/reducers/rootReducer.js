import { combineReducers } from 'redux';
import { product } from './productReducer';


const rootReducer = combineReducers({
    product
});

export default rootReducer;