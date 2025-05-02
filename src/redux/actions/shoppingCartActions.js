import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';

// Action Types
export const SET_CART = 'SET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART_ITEM_CHECK = 'TOGGLE_CART_ITEM_CHECK';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_CHECKOUT_ADDRESS = 'SET_CHECKOUT_ADDRESS';
export const SET_ORDER_LOADING = 'SET_ORDER_LOADING';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';

// Action Creators
export const setCart = (cart) => ({
    type: SET_CART,
    payload: cart
});

export const addToCart = (product, count = 1, checked = true) => ({
    type: ADD_TO_CART,
    payload: { product, count, checked }
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
});

export const updateCartItem = (productId, count) => ({
    type: UPDATE_CART_ITEM,
    payload: { productId, count }
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const toggleCartItemCheck = (productId) => ({
    type: TOGGLE_CART_ITEM_CHECK,
    payload: productId
});

export const setPayment = (paymentInfo) => ({
    type: SET_PAYMENT,
    payload: paymentInfo
});

export const setAddress = (addressInfo) => ({
    type: SET_ADDRESS,
    payload: addressInfo
});

export const setCheckoutAddress = (checkoutAddress) => ({
    type: SET_CHECKOUT_ADDRESS,
    payload: checkoutAddress
});

export const setOrderLoading = (isLoading) => ({
    type: SET_ORDER_LOADING,
    payload: isLoading
});

export const setOrderError = (error) => ({
    type: SET_ORDER_ERROR,
    payload: error
});

export const setOrderSuccess = (orderData) => ({
    type: SET_ORDER_SUCCESS,
    payload: orderData
});

// Thunk Action Creator for adding to cart
export const addProductToCart = (product, count = 1, checked = true) => {
    return (dispatch, getState) => {
        dispatch(addToCart(product, count, checked));
        
        const userId = getState().client?.user?.id;
        const currentCart = getState().shoppingCart.cart;
        
        // Save cart to localStorage for both authenticated and anonymous users
        if (userId) {
            saveCartForUser(userId, currentCart);
        } else {
            saveAnonymousCart(currentCart);
        }
    };
};

// Cart persistence functions
export const saveCartForUser = (userId, cart) => {
    try {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    } catch (error) {
        console.error('Sepet kaydedilemedi:', error);
    }
};

export const loadCartForUser = (userId) => {
    try {
        const savedCart = localStorage.getItem(`cart_${userId}`);
        if (savedCart) {
            return JSON.parse(savedCart);
        }
        return [];
    } catch (error) {
        console.error('Sepet yüklenemedi:', error);
        return [];
    }
};

// Anonymous cart functions
export const saveAnonymousCart = (cart) => {
    try {
        localStorage.setItem('anonymous_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Misafir sepeti kaydedilemedi:', error);
    }
};

export const loadAnonymousCart = () => {
    try {
        const savedCart = localStorage.getItem('anonymous_cart');
        if (savedCart) {
            return JSON.parse(savedCart);
        }
        return [];
    } catch (error) {
        console.error('Misafir sepeti yüklenemedi:', error);
        return [];
    }
};

// Initialize cart
export const initializeCart = () => (dispatch, getState) => {
    const userId = getState().client?.user?.id;
    if (userId) {
        // User is logged in, load user cart
        const userCart = loadCartForUser(userId);
        dispatch(setCart(userCart));
    } else {
        // User is not logged in, load anonymous cart
        const anonymousCart = loadAnonymousCart();
        dispatch(setCart(anonymousCart));
    }
};

// Load user cart when logging in
export const loadUserCart = (userId) => (dispatch) => {
    // First check if there's an anonymous cart to merge
    const anonymousCart = loadAnonymousCart();
    const userCart = loadCartForUser(userId);
    
    // If we have both carts, merge them
    if (anonymousCart.length > 0) {
        console.log('Merging anonymous cart with user cart during login');
        
        // Merge logic: Add items from anonymous cart to user cart if not already present
        const mergedCart = [...userCart];
        
        anonymousCart.forEach(anonItem => {
            const existingItemIndex = mergedCart.findIndex(item => 
                item.product.id === anonItem.product.id
            );
            
            if (existingItemIndex === -1) {
                // Item not in user cart, add it
                mergedCart.push(anonItem);
            } else {
                // Item already in user cart, update count
                mergedCart[existingItemIndex].count += anonItem.count;
            }
        });
        
        // Save merged cart and clear anonymous cart
        saveCartForUser(userId, mergedCart);
        localStorage.removeItem('anonymous_cart');
        
        // Update Redux state
        dispatch(setCart(mergedCart));
    } else {
        // No anonymous cart, just load user cart
        dispatch(setCart(userCart));
    }
};

// Save cart when logging out
export const handleLogout = () => (dispatch, getState) => {
    // Get current user ID
    const userId = getState().client?.user?.id;
    const currentCart = getState().shoppingCart.cart;
    
    // Save cart if user ID exists
    if (userId) {
        saveCartForUser(userId, currentCart);
    }
    
    // Clear cart in Redux state
    dispatch(clearCart());
    
    // Remove token
    localStorage.removeItem('token');
};

// Middleware to sync cart changes with localStorage
export const syncCartWithLocalStorage = (store) => (next) => (action) => {
    // Process the action first
    const result = next(action);
    
    // These are the actions that modify the cart
    const cartModifyingActions = [
        ADD_TO_CART, 
        REMOVE_FROM_CART, 
        UPDATE_CART_ITEM, 
        CLEAR_CART, 
        TOGGLE_CART_ITEM_CHECK, 
        SET_CART
    ];
    
    // If this was a cart-modifying action
    if (cartModifyingActions.includes(action.type)) {
        const state = store.getState();
        const userId = state.client?.user?.id;
        const cart = state.shoppingCart.cart;
        
        // If user is logged in, save to user cart
        if (userId) {
            saveCartForUser(userId, cart);
        } else {
            // Otherwise save to anonymous cart
            saveAnonymousCart(cart);
        }
    }
    
    return result;
};

// Thunk Action Creator for creating an order
export const createOrder = (orderData) => async (dispatch, getState) => {
    try {
        dispatch(setOrderLoading(true));
        
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to place an order');
        }
        
        // Use axios instance for the request
        const response = await axiosInstance.post('/order', orderData, {
            headers: {
                'Authorization': token
            }
        });
        
        // Handle successful order
        dispatch(setOrderSuccess(response.data));
        
        // Get current user ID
        const userId = getState().client?.user?.id;
        
        // Clear cart and save empty cart for user
        dispatch(clearCart());
        if (userId) {
            saveCartForUser(userId, []);
        }
        
        // Remove checkout data from localStorage
        localStorage.removeItem('checkoutData');
        
        // Return the data so the component can redirect
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error creating order:', error);
        dispatch(setOrderError(error.message || 'Failed to create order'));
        toast.error(error.message || 'Failed to create order');
        return {
            success: false,
            error: error.message || 'Failed to create order'
        };
    } finally {
        dispatch(setOrderLoading(false));
    }
};