import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getCartItem,
  cartAddItem,
  cartRemoveItem,
  cartUpdateItem,
  cartBulkRemoveItem
} from "../utils/APIRoute";

const initialState = {
  cartItems: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch cart items from the backend
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getCartItem, {
        withCredentials: true, // Ensures cookies are sent with the request
      });

      console.log("Backend Response Message:", response.data.message);

      return response.data || [];
    } catch (error) {
      if (error.response) {
        console.error("Backend Error Message:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.error("Unexpected Error: ", error.message);
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

// Async thunk to add item to the cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(cartAddItem, item, {
        withCredentials: true,
      });

      console.log("Item added to cart:", response.data.message);
      return item;
    } catch (error) {
      if (error.response) {
        console.error("Backend Error Message:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.error("Unexpected Error:", error.message);
        return rejectWithValue("Failed to add item to cart.");
      }
    }
  }
);

// Async thunk to remove item from the cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(cartRemoveItem, {
        data: { bookId },
        withCredentials: true,
      });

      console.log("Item removed from cart:", response.data.message);
      return bookId;
    } catch (error) {
      if (error.response) {
        console.error("Backend Error Message:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.error("Unexpected Error:", error.message);
        return rejectWithValue("Failed to remove item from cart.");
      }
    }
  }
);

// Async thunk to bulk remove items from the cart
export const bulkRemoveItemsFromCart = createAsyncThunk(
  "cart/bulkRemoveItemsFromCart",
  async (bookIds, { rejectWithValue }) => {
    try {
      const response = await axios.post(cartBulkRemoveItem, { bookIds }, {
        withCredentials: true,
      });

      console.log("Items removed from cart:", response.data.message);
      return bookIds; // Return the bookIds to remove them from the state
    } catch (error) {
      if (error.response) {
        console.error("Backend Error Message:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.error("Unexpected Error:", error.message);
        return rejectWithValue("Failed to remove items from cart.");
      }
    }
  }
);


// Async thunk to update cart item
export const updateItemInCart = createAsyncThunk(
  "cart/updateItemInCart",
  async ({ bookId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        cartUpdateItem,
        { bookId, quantity },
        {
          withCredentials: true,
        }
      );

      console.log("Item updated in cart:", response.data.message);
      return { bookId, quantity };
    } catch (error) {
      if (error.response) {
        console.error("Backend Error Message:", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.error("Unexpected Error:", error.message);
        return rejectWithValue("Failed to update item in cart.");
      }
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.bookId === newItem.bookId
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const bookIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.bookId !== bookIdToRemove
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { bookId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.bookId === bookId
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = Math.max(1, quantity);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        console.log("Cart Items successfully fetched:", state.cartItems);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch cart items";
        console.error("Error:", action.payload);
      })
      // Handling add item to cart
      .addCase(addItemToCart.fulfilled, (state, action) => {
        console.log("Item added to cart");
      })
      // Handling remove item from cart
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.bookId !== action.payload
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      // Handling update item in cart
      .addCase(updateItemInCart.fulfilled, (state, action) => {
        const { bookId, quantity } = action.payload;
        const itemIndex = state.cartItems.findIndex(
          (item) => item.bookId === bookId
        );
        if (itemIndex !== -1) {
          state.cartItems[itemIndex].quantity = quantity;
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      })
      // Handling bulk removal of items from the cart
      .addCase(bulkRemoveItemsFromCart.fulfilled, (state, action) => {
        const bookIdsToRemove = action.payload;
        state.cartItems = state.cartItems.filter(
          (item) => !bookIdsToRemove.includes(item.bookId)
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
