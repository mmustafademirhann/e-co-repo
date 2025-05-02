import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import cardReducer from './reducers/cardReducer';
import { syncCartWithLocalStorage } from './actions/shoppingCartActions';

const rootReducer = combineReducers({
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
    card: cardReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, syncCartWithLocalStorage, logger)
);

export default store;