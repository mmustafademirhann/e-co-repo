// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_CREDIT_CARDS = 'SET_CREDIT_CARDS';
export const ADD_CREDIT_CARD = 'ADD_CREDIT_CARD';
export const UPDATE_CREDIT_CARD = 'UPDATE_CREDIT_CARD';
export const DELETE_CREDIT_CARD = 'DELETE_CREDIT_CARD';

// Action Creators
export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const setRoles = (roles) => ({
    type: SET_ROLES,
    payload: roles
});

export const setTheme = (theme) => ({
    type: SET_THEME,
    payload: theme
});

export const setLanguage = (language) => ({
    type: SET_LANGUAGE,
    payload: language
});

export const setCreditCards = (cards) => ({
    type: SET_CREDIT_CARDS,
    payload: cards
});

export const addCreditCard = (card) => ({
    type: ADD_CREDIT_CARD,
    payload: card
});

export const updateCreditCard = (card) => ({
    type: UPDATE_CREDIT_CARD,
    payload: card
});

export const deleteCreditCard = (cardId) => ({
    type: DELETE_CREDIT_CARD,
    payload: cardId
});

// Thunk Action Creator for Roles
export const fetchRoles = () => async (dispatch) => {
    try {
        const response = await fetch('https://workintech-fe-ecommerce.onrender.com/roles');
        const data = await response.json();
        dispatch(setRoles(data));
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
};

// Thunk Action Creator for Credit Cards
export const fetchCreditCards = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('No token found');
            return;
        }
        
        const response = await fetch('/user/card', {
            headers: {
                'Authorization': token
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch credit cards');
        }
        
        const data = await response.json();
        let cardsList = [];
        
        if (Array.isArray(data)) {
            cardsList = data;
        } else if (data.data && Array.isArray(data.data)) {
            cardsList = data.data;
        } else {
            const possibleArrays = Object.values(data).find(val => Array.isArray(val));
            if (possibleArrays) {
                cardsList = possibleArrays;
            }
        }
        
        dispatch(setCreditCards(cardsList));
    } catch (error) {
        console.error('Error fetching credit cards:', error);
    }
};