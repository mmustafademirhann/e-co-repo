import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';

// Action Types
export const SET_CREDIT_CARDS = 'SET_CREDIT_CARDS';
export const ADD_CREDIT_CARD = 'ADD_CREDIT_CARD';
export const UPDATE_CREDIT_CARD = 'UPDATE_CREDIT_CARD';
export const DELETE_CREDIT_CARD = 'DELETE_CREDIT_CARD';
export const SET_CARD_LOADING = 'SET_CARD_LOADING';
export const SET_CARD_ERROR = 'SET_CARD_ERROR';

// Action Creators
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

export const setCardLoading = (loading) => ({
    type: SET_CARD_LOADING,
    payload: loading
});

export const setCardError = (error) => ({
    type: SET_CARD_ERROR,
    payload: error
});

// Thunk Action Creators
export const fetchCreditCards = () => async (dispatch) => {
    try {
        dispatch(setCardLoading(true));
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('No token found');
            dispatch(setCardError('Please login to view saved cards'));
            return;
        }
        
        axiosInstance.defaults.headers.common['Authorization'] = token;
        const response = await axiosInstance.get('/user/card');
        
        // Handle different API response formats
        let cardsList = [];
        if (response && response.data) {
            if (Array.isArray(response.data)) {
                cardsList = response.data;
            } else if (response.data.data && Array.isArray(response.data.data)) {
                cardsList = response.data.data;
            } else {
                const possibleArrays = Object.values(response.data).find(val => Array.isArray(val));
                if (possibleArrays) {
                    cardsList = possibleArrays;
                }
            }
        }
        
        dispatch(setCreditCards(cardsList));
    } catch (error) {
        console.error('Error fetching credit cards:', error);
        dispatch(setCardError('Failed to load saved cards'));
        toast.error('Could not load your saved cards');
    } finally {
        dispatch(setCardLoading(false));
    }
};

export const createCreditCard = (cardData) => async (dispatch) => {
    try {
        dispatch(setCardLoading(true));
        
        // Validate card data
        if (cardData.card_no.replace(/\s/g, '').length !== 16) {
            throw new Error('Card number must be 16 digits');
        }
        
        if (!cardData.name_on_card || cardData.name_on_card.length < 3) {
            throw new Error('Please enter the name as it appears on your card');
        }
        
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to add a card');
        }
        
        axiosInstance.defaults.headers.common['Authorization'] = token;
        
        // Format data for API
        const formattedCardData = {
            card_no: cardData.card_no.replace(/\s/g, ''),
            expire_month: parseInt(cardData.expire_month),
            expire_year: parseInt(cardData.expire_year),
            name_on_card: cardData.name_on_card
        };
        
        const response = await axiosInstance.post('/user/card', formattedCardData);
        
        // Extract card ID from response
        let newCardId;
        if (response.data && response.data.id) {
            newCardId = response.data.id;
        } else if (response.data && response.data.data && response.data.data.id) {
            newCardId = response.data.data.id;
        } else {
            // Generate a temporary ID if the API doesn't return one
            newCardId = Date.now();
        }
        
        // Add to Redux store
        const newCard = {
            id: newCardId,
            ...formattedCardData
        };
        
        dispatch(addCreditCard(newCard));
        toast.success('New card added successfully');
        
        return newCard;
    } catch (error) {
        console.error('Error adding credit card:', error);
        dispatch(setCardError(error.message || 'Failed to add card'));
        toast.error(error.message || 'Failed to add card');
        throw error;
    } finally {
        dispatch(setCardLoading(false));
    }
};

export const editCreditCard = (cardData) => async (dispatch) => {
    try {
        dispatch(setCardLoading(true));
        
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to update a card');
        }
        
        axiosInstance.defaults.headers.common['Authorization'] = token;
        
        // Format data for API
        const formattedCardData = {
            id: cardData.id,
            card_no: cardData.card_no.replace(/\s/g, ''),
            expire_month: parseInt(cardData.expire_month),
            expire_year: parseInt(cardData.expire_year),
            name_on_card: cardData.name_on_card
        };
        
        await axiosInstance.put('/user/card', formattedCardData);
        
        // Update in Redux store
        dispatch(updateCreditCard(formattedCardData));
        toast.success('Card updated successfully');
        
        return formattedCardData;
    } catch (error) {
        console.error('Error updating credit card:', error);
        dispatch(setCardError(error.message || 'Failed to update card'));
        toast.error(error.message || 'Failed to update card');
        throw error;
    } finally {
        dispatch(setCardLoading(false));
    }
};

export const removeCreditCard = (cardId) => async (dispatch) => {
    try {
        dispatch(setCardLoading(true));
        
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to delete a card');
        }
        
        axiosInstance.defaults.headers.common['Authorization'] = token;
        
        await axiosInstance.delete(`/user/card/${cardId}`);
        
        // Remove from Redux store
        dispatch(deleteCreditCard(cardId));
        toast.success('Card deleted successfully');
        
        return cardId;
    } catch (error) {
        console.error('Error deleting credit card:', error);
        dispatch(setCardError(error.message || 'Failed to delete card'));
        toast.error(error.message || 'Failed to delete card');
        throw error;
    } finally {
        dispatch(setCardLoading(false));
    }
}; 