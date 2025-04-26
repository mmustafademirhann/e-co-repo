// Action Types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';

// Fetch States
export const FETCH_STATES = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
    FAILED: 'FAILED'
};

// Action Creators
export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories
});

export const setProductList = (products) => ({
    type: SET_PRODUCT_LIST,
    payload: products
});

export const setTotal = (total) => ({
    type: SET_TOTAL,
    payload: total
});

export const setFetchState = (state) => ({
    type: SET_FETCH_STATE,
    payload: state
});

export const setLimit = (limit) => ({
    type: SET_LIMIT,
    payload: limit
});

export const setOffset = (offset) => ({
    type: SET_OFFSET,
    payload: offset
});

export const setFilter = (filter) => ({
    type: SET_FILTER,
    payload: filter
});