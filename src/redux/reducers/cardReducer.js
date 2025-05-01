import {
    SET_CREDIT_CARDS,
    ADD_CREDIT_CARD,
    UPDATE_CREDIT_CARD,
    DELETE_CREDIT_CARD,
    SET_CARD_LOADING,
    SET_CARD_ERROR
} from '../actions/cardActions';

const initialState = {
    cards: [],
    loading: false,
    error: null
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CREDIT_CARDS:
            return {
                ...state,
                cards: action.payload,
                error: null
            };

        case ADD_CREDIT_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload],
                error: null
            };

        case UPDATE_CREDIT_CARD:
            return {
                ...state,
                cards: state.cards.map(card => 
                    card.id === action.payload.id ? action.payload : card
                ),
                error: null
            };

        case DELETE_CREDIT_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload),
                error: null
            };

        case SET_CARD_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case SET_CARD_ERROR:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export default cardReducer; 