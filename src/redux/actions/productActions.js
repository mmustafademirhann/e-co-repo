import axiosInstance from '../../api/axios';

// Action Types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
export const SET_SINGLE_PRODUCT_LOADING = 'SET_SINGLE_PRODUCT_LOADING';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS';
export const SET_PRODUCT_LOADING = 'SET_PRODUCT_LOADING';
export const SET_PRODUCT_ERROR = 'SET_PRODUCT_ERROR';
export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';
export const SET_SINGLE_PRODUCT_ERROR = 'SET_SINGLE_PRODUCT_ERROR';

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

export const setSort = (sort) => ({
    type: SET_SORT,
    payload: sort
});

export const setSingleProduct = (product) => ({
    type: SET_SINGLE_PRODUCT,
    payload: product
});

export const setSingleProductLoading = (isLoading) => ({
    type: SET_SINGLE_PRODUCT_LOADING,
    payload: isLoading
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products
});

export const setFilteredProducts = (products) => ({
    type: SET_FILTERED_PRODUCTS,
    payload: products
});

export const setProductLoading = (isLoading) => ({
    type: SET_PRODUCT_LOADING,
    payload: isLoading
});

export const setProductError = (error) => ({
    type: SET_PRODUCT_ERROR,
    payload: error
});

export const setSelectedProduct = (product) => ({
    type: SET_SELECTED_PRODUCT,
    payload: product
});

// Thunk Action Creator for Categories
export const fetchCategories = () => async (dispatch) => {
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    try {
        const response = await fetch('https://workintech-fe-ecommerce.onrender.com/categories');
        const data = await response.json();
        dispatch(setCategories(data));
        dispatch(setFetchState(FETCH_STATES.FETCHED));
    } catch (error) {
        console.error('Error fetching categories:', error);
        dispatch(setFetchState(FETCH_STATES.FAILED));
    }
};

// Thunk Action Creator for Products (Adapted from user-provided working version)
export const fetchProducts = ({
  categoryId, // Use categoryId to match ShopPage params
  sort,
  filter,
  limit = 25, // Keep project's default limit
  offset = 0,
} = {}) => {
  return async (dispatch) => {
    console.log('fetchProducts (Merged Version): Params Received:', { categoryId, sort, filter, limit, offset });
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    
    try {
      let query = "";

      if (categoryId) {
        query += `category=${categoryId}&`;
      }
      if (filter) {
        query += `filter=${encodeURIComponent(filter)}&`;
      }
      if (sort) {
        query += `sort=${encodeURIComponent(sort)}&`;
      }
      query += `limit=${limit}&offset=${offset}&`;

      if (query.endsWith("&")) {
        query = query.slice(0, -1);
      }

      const url = `/products${query ? `?${query}` : ""}`;
      console.log('fetchProducts (Merged Version): Fetching URL with axiosInstance:', url);

      const response = await axiosInstance.get(url);
      
      console.log('fetchProducts (Merged Version): API Response Status:', response.status);
      console.log('fetchProducts (Merged Version): Received data:', response.data);

      const { products, total } = response.data;

      if (!Array.isArray(products)) {
          console.error('fetchProducts (Merged Version): Invalid products format:', products);
          throw new Error('Invalid response format: products is not an array');
      }

      dispatch(setProductList(products));
      dispatch(setTotal(total ?? products.length));
      dispatch(setLimit(limit));
      dispatch(setOffset(offset));
      dispatch(setFetchState(FETCH_STATES.FETCHED));

    } catch (error) {
      console.error("fetchProducts (Merged Version): Error fetching products:", error);
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        console.error('API Error Status:', error.response.status);
      }
      dispatch(setProductList([])); 
      dispatch(setTotal(0));
      dispatch(setFetchState(FETCH_STATES.FAILED));
    }
  };
};

// Thunk Action Creator for Single Product
export const fetchSingleProduct = (productId) => async (dispatch) => {
  // Log the productId being fetched for debugging
  console.log('Fetching product with ID:', productId);
  
  // Validate productId
  if (!productId) {
    console.error('Product ID is undefined or invalid');
    dispatch({
      type: SET_SINGLE_PRODUCT_ERROR,
      payload: 'Invalid product ID'
    });
    return;
  }

  try {
    // Clear previous errors and set loading state
    dispatch({ type: SET_SINGLE_PRODUCT_ERROR, payload: null });
    dispatch({ type: SET_SINGLE_PRODUCT_LOADING, payload: true });
    
    // Make API request
    const response = await axiosInstance.get(`/products/${productId}`);
    console.log('Product API response:', response);
    
    // Validate response
    if (!response || !response.data) {
      throw new Error('Invalid API response');
    }
    
    // Format data as needed
    const productData = response.data;
    
    // Ensure images is always an array
    if (productData.images && !Array.isArray(productData.images)) {
      productData.images = [productData.images];
    } else if (!productData.images) {
      productData.images = [];
    }
    
    // Dispatch success
    dispatch({
      type: SET_SINGLE_PRODUCT,
      payload: productData
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    
    let errorMessage = 'An error occurred while fetching the product';
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with an error status
      const { status } = error.response;
      console.log('Error status:', status, 'Error data:', error.response.data);
      
      if (status === 404) {
        errorMessage = 'Product not found';
      } else if (status === 403) {
        errorMessage = 'You do not have permission to view this product';
      } else if (status >= 500) {
        errorMessage = 'Server error. Please try again later';
      }
    } else if (error.request) {
      // Request was made but no response received (network issue)
      errorMessage = 'Network error. Please check your connection';
    }
    
    // Dispatch error action
    dispatch({
      type: SET_SINGLE_PRODUCT_ERROR,
      payload: errorMessage
    });
  } finally {
    dispatch({ type: SET_SINGLE_PRODUCT_LOADING, payload: false });
  }
};

// Thunk action to fetch product details by ID
export const fetchProductById = (productId) => async (dispatch) => {
  console.log("fetchProductById called with productId:", productId, "type:", typeof productId);
  
  // Set loading state
  dispatch(setProductLoading(true));
  dispatch(setSingleProductLoading(true));
  dispatch(setProductError(null)); // Reset any previous errors
  
  try {
    // For debugging - log URL
    const url = `/products/${productId}`;
    console.log("Making alternative API request to:", url);
    
    // Make API request
    const response = await axiosInstance.get(url);
    console.log("Alternative API Response Success - data:", response.data);
    
    if (!response.data) {
        console.error("Alternative API returned empty response data");
        throw new Error("Ürün bilgisi alınamadı");
    }
    
    // Set product data to store
    dispatch(setSelectedProduct(response.data));
    dispatch(setSingleProduct(response.data));
    
    // Clear loading state
    dispatch(setProductLoading(false));
    dispatch(setSingleProductLoading(false));
    
    return response.data;
  } catch (error) {
    console.error('Error in alternative fetch for product details:', error);
    
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Alternative API Response Error:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data
        });
        
        if (error.response.status === 404) {
            dispatch(setProductError("Ürün bulunamadı"));
        } else {
            dispatch(setProductError(`Sunucu hatası: ${error.response.status} ${error.response.statusText}`));
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.error("Alternative API Request Error - No response:", error.request);
        dispatch(setProductError("Sunucu yanıt vermiyor"));
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Alternative API Setup Error:", error.message);
        dispatch(setProductError(`İstek hatası: ${error.message}`));
    }
    
    // Handle error states
    dispatch(setProductLoading(false));
    dispatch(setSingleProductLoading(false));
    throw error;
  }
};

// Action to clear single product data
export const clearSingleProductData = () => ({
  type: SET_SINGLE_PRODUCT,
  payload: null
});

// Action to clear single product errors
export const clearSingleProductError = () => ({
  type: SET_SINGLE_PRODUCT_ERROR,
  payload: null
});