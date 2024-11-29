import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {message} from "antd";
import { cartAddItem, cartRemoveItem, cartUpdateItem } from "../utils/APIRoute";

// Initial state, with cartItems loaded from localStorage if available
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Async thunk to add item to the cart
export const addToCartAPI = createAsyncThunk(
  'cart/addToCartAPI',
  async (newItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(cartAddItem, newItem); // API call to add item
      return response.data; // Assuming API returns the updated cart or status
    } catch (error) {

      const errorMessage = error.response?.data?.message || "Error adding to cart";
      message.error(errorMessage, 1);
      return rejectWithValue(errorMessage) // In case of error
    }
  }
);

// Async thunk to remove item from the cart
export const removeFromCartAPI = createAsyncThunk(
  'cart/removeFromCartAPI',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${cartRemoveItem}/${bookId}`); // API call to remove item
      return bookId; // Return bookId to remove it from state
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error adding to cart";
      message.error(errorMessage, 1);
      return rejectWithValue(errorMessage)
    }
  }
);

// Async thunk to update item quantity in the cart
export const updateQuantityAPI = createAsyncThunk(
  'cart/updateQuantityAPI',
  async ({ bookId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(cartUpdateItem, { bookId, quantity }); // API call to update item
      return { bookId, quantity }; // Return the updated quantity and bookId
    } catch (error) {
       const errorMessage = error.response?.data?.message || "Error adding to cart";
      message.error(errorMessage, 1);
      return rejectWithValue(errorMessage)
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
  extraReducers: (builder) => {
    // Handling the addToCartAPI async thunk
    builder
      .addCase(addToCartAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state based on the response, e.g., updating cartItems
        state.cartItems.push(action.payload);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling the removeFromCartAPI async thunk
    builder
      .addCase(removeFromCartAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the item from cart based on the bookId
        state.cartItems = state.cartItems.filter((item) => item.bookId !== action.payload);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      })
      .addCase(removeFromCartAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Handling the updateQuantityAPI async thunk
    builder
      .addCase(updateQuantityAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQuantityAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the quantity of the item in the cart
        const { bookId, quantity } = action.payload;
        const itemIndex = state.cartItems.findIndex((item) => item.bookId === bookId);
        if (itemIndex !== -1) {
          state.cartItems[itemIndex].quantity = quantity;
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
      })
      .addCase(updateQuantityAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;

// Export the async thunks for dispatching
// export { addToCartAPI, removeFromCartAPI, updateQuantityAPI };
