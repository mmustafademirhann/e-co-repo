import {
    SET_CATEGORIES,
    SET_PRODUCT_LIST,
    SET_TOTAL,
    SET_FETCH_STATE,
    SET_LIMIT,
    SET_OFFSET,
    SET_FILTER,
    SET_SORT,
    SET_SINGLE_PRODUCT,
    SET_SINGLE_PRODUCT_LOADING,
    SET_PRODUCTS,
    SET_FILTERED_PRODUCTS,
    SET_PRODUCT_LOADING,
    SET_PRODUCT_ERROR,
    SET_SELECTED_PRODUCT,
    SET_SINGLE_PRODUCT_ERROR,
    SET_BESTSELLER_PRODUCTS,
    SET_BESTSELLER_LOADING,
    SET_BESTSELLER_ERROR
} from '../actions/productActions';

// Define these locally to avoid initialization issues
const FETCH_STATES = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
    FAILED: 'FAILED'
};

const initialState = {
    categories: [],
    productList: [],
    total: 0,
    limit: 25,
    offset: 0,
    filter: '',
    sort: '',
    categoryId: null,
    fetchState: FETCH_STATES.NOT_FETCHED,
    singleProduct: null,
    singleProductLoading: false,
    singleProductError: null,
    products: [],
    filteredProducts: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
    bestsellerProducts: [],
    bestsellerLoading: false,
    bestsellerError: null
};

const productReducer = (state = initialState, action) => {
    console.log("PRODUCT REDUCER: Processing action", action.type, action.payload);
    
    switch (action.type) {
        case SET_BESTSELLER_PRODUCTS:
            return {
                ...state,
                bestsellerProducts: action.payload,
                bestsellerError: null
            };
        case SET_BESTSELLER_LOADING:
            return {
                ...state,
                bestsellerLoading: action.payload
            };
        case SET_BESTSELLER_ERROR:
            return {
                ...state,
                bestsellerError: action.payload,
                bestsellerLoading: false
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload
            };
        case SET_TOTAL:
            return {
                ...state,
                total: action.payload
            };
        case SET_FETCH_STATE:
            return {
                ...state,
                fetchState: action.payload
            };
        case SET_LIMIT:
            return {
                ...state,
                limit: action.payload
            };
        case SET_OFFSET:
            return {
                ...state,
                offset: action.payload
            };
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        case SET_SORT:
            return {
                ...state,
                sort: action.payload
            };
        case SET_SINGLE_PRODUCT:
            console.log("Setting single product:", action.payload);
            return {
                ...state,
                singleProduct: action.payload,
                singleProductError: null,
                selectedProduct: action.payload || state.selectedProduct
            };
        case SET_SINGLE_PRODUCT_LOADING:
            return {
                ...state,
                singleProductLoading: action.payload
            };
        case SET_SINGLE_PRODUCT_ERROR:
            return {
                ...state,
                singleProductError: action.payload,
                singleProductLoading: false
            };
        case SET_PRODUCT_LOADING:
            console.log("SET_PRODUCT_LOADING action received:", action.payload);
            return {
                ...state,
                isLoading: action.payload
            };
        case SET_PRODUCT_ERROR:
            console.log("SET_PRODUCT_ERROR action received:", action.payload);
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case SET_SELECTED_PRODUCT:
            console.log("SET_SELECTED_PRODUCT action received:", action.payload);
            return {
                ...state,
                selectedProduct: action.payload
            };
        default:
            return state;
    }
};

export default productReducer;