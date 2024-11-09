// cartApi.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/cart';  // Use your cart API URL

// Create an axios instance for cart-specific API calls
export const cartAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),  // Add token if needed
  },
});

// API call to add product to cart
export const addToCart = async (productId, quantity) => {
  try {
    const response = await cartAxios.post('/add-to-cart', { productId, quantity });
    return response.data;  // Return the response data for further handling
  } catch (error) {
    throw new Error('Error adding to cart: ' + error.message);
  }
};

// API call to fetch products in cart
export const getCartProducts = async () => {
  try {
    const response = await cartAxios.get('/get-cart-products');
    return response.data;  // Return the cart data
  } catch (error) {
    throw new Error('Error fetching cart products: ' + error.message);
  }
};
