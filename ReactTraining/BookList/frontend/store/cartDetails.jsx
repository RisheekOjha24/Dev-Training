import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.bookId === newItem.bookId
      );

      if (existingItemIndex !== -1) {
        // If item exists, update the quantity
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // If item doesn't exist, add it to the cart
        state.cartItems.push(newItem);
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const bookIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.bookId !== bookIdToRemove);

      // Save the updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { bookId, quantity } = action.payload;

      // Find the item in the cart
      const itemIndex = state.cartItems.findIndex((item) => item.bookId === bookId);

      if (itemIndex !== -1) {
        // Update the quantity if item is found
        state.cartItems[itemIndex].quantity = quantity;

        // Ensure the quantity is at least 1
        if (state.cartItems[itemIndex].quantity < 1) {
          state.cartItems[itemIndex].quantity = 1;
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
