import { 
    SET_CART, 
    ADD_TO_CART, 
    REMOVE_FROM_CART, 
    UPDATE_CART_ITEM, 
    CLEAR_CART,
    TOGGLE_CART_ITEM_CHECK,
    SET_PAYMENT, 
    SET_ADDRESS,
    SET_CHECKOUT_ADDRESS,
    SET_ORDER_LOADING,
    SET_ORDER_ERROR,
    SET_ORDER_SUCCESS
} from '../actions/shoppingCartActions';

const initialState = {
    cart: [],  // [{count: number, checked: boolean, product: object}]
    payment: null,
    address: null,
    checkoutAddress: null, // Will store {shippingAddressId, receiptAddressId}
    orderLoading: false,
    orderError: null,
    lastOrder: null
};

const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cart: action.payload
            };
            
        case ADD_TO_CART: {
            const { product, count, checked } = action.payload;
            
            // Ürün zaten sepette var mı kontrol et
            const existingItemIndex = state.cart.findIndex(item => item.product.id === product.id);
            
            if (existingItemIndex !== -1) {
                // Eğer ürün zaten sepette varsa, miktarını arttır
                const updatedCart = [...state.cart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    count: updatedCart[existingItemIndex].count + count
                };
                
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                // Eğer ürün sepette yoksa, yeni ekle
                return {
                    ...state,
                    cart: [...state.cart, { count, checked, product }]
                };
            }
        }
            
        case REMOVE_FROM_CART: {
            const productId = action.payload;
            
            return {
                ...state,
                cart: state.cart.filter(item => item.product.id !== productId)
            };
        }
            
        case UPDATE_CART_ITEM: {
            const { productId, count } = action.payload;
            
            // Eğer miktar 0 veya daha az ise, ürünü sepetten kaldır
            if (count <= 0) {
                return {
                    ...state,
                    cart: state.cart.filter(item => item.product.id !== productId)
                };
            }
            
            // Miktarı güncelle
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.product.id === productId 
                        ? { ...item, count } 
                        : item
                )
            };
        }
            
        case CLEAR_CART:
            return {
                ...state,
                cart: []
            };
        
        case TOGGLE_CART_ITEM_CHECK: {
            const productId = action.payload;
            
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.product.id === productId 
                        ? { ...item, checked: !item.checked } 
                        : item
                )
            };
        }
            
        case SET_PAYMENT:
            return {
                ...state,
                payment: action.payload
            };
            
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            };
            
        case SET_CHECKOUT_ADDRESS:
            return {
                ...state,
                checkoutAddress: action.payload
            };
            
        case SET_ORDER_LOADING:
            return {
                ...state,
                orderLoading: action.payload
            };
            
        case SET_ORDER_ERROR:
            return {
                ...state,
                orderError: action.payload,
                orderLoading: false
            };
            
        case SET_ORDER_SUCCESS:
            return {
                ...state,
                lastOrder: action.payload,
                orderError: null,
                orderLoading: false
            };
            
        default:
            return state;
    }
};

export default shoppingCartReducer;