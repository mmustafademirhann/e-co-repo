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

export const addToCart = (product, count = 1) => ({
    type: ADD_TO_CART,
    payload: { product, count, checked: true }
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

export const setPayment = (payment) => ({
    type: SET_PAYMENT,
    payload: payment
});

export const setAddress = (address) => ({
    type: SET_ADDRESS,
    payload: address
});

export const setCheckoutAddress = (addressData) => ({
    type: SET_CHECKOUT_ADDRESS,
    payload: addressData
});

export const setOrderLoading = (loading) => ({
    type: SET_ORDER_LOADING,
    payload: loading
});

export const setOrderError = (error) => ({
    type: SET_ORDER_ERROR,
    payload: error
});

export const setOrderSuccess = (orderData) => ({
    type: SET_ORDER_SUCCESS,
    payload: orderData
});

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

// Load user cart when logging in
export const loadUserCart = (userId) => (dispatch) => {
  const userCart = loadCartForUser(userId);
  dispatch(setCart(userCart));
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