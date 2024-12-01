import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  updateItemInCart,
  bulkRemoveItemsFromCart,
  removeItemFromCart,
} from "../../store/cartDetails";
import Navbar from "../components/Navbar";
import { message } from "antd";
import sweetAlert from "../components/sweetNotification";
import { FaTrash } from "react-icons/fa";
import Checkout from "../components/Checkout";
import { debounce } from "lodash";
import { useCallback } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartData.cartItems);

  const [isCheckoutBtnClick, setCheckoutBtnClick] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Debounced function for updating item in cart
  const debouncedUpdateItemInCart = useCallback(
    debounce((bookId, quantity) => {
      dispatch(updateItemInCart({ bookId, quantity }));
    }, 2000),
    [] // Dependency array ensures this is created only once
  );

  const calculateTotal=(cartItems)=>{
    let newtotalPrice=cartItems
  .reduce((total, item) => total + item.price * item.quantity, 0)
  .toFixed(2);
    return newtotalPrice;
  }

  const handleQuantityChange = (bookId, quantity) => {
    if (quantity < 1) {
      message.error("Quantity cannot be less than 1.", 1);
      return;
    }
    dispatch(updateQuantity({ bookId, quantity }));
    debouncedUpdateItemInCart(bookId, quantity);
  };

  const handleRemoveItem = async (bookId) => {
    const response = await sweetAlert();
    if (!response.isConfirmed) return;
    dispatch(removeItemFromCart(bookId));
    dispatch(removeFromCart(bookId));
    message.success("Item removed from cart.", 1);
  };

  const handleCheckboxChange = (bookId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(bookId)) {
        return prevSelected.filter((id) => id !== bookId);
      } else {
        return [...prevSelected, bookId];
      }
    });
  };

const handleBulkRemove = async () => {
  const response = await sweetAlert();  // Show confirmation dialog
  if (!response.isConfirmed) return;

  // Dispatch the bulk removal action using the bulkRemoveItemsFromCart async thunk
  try {
    // Dispatch removeItemFromCart sequentially (if necessary, but it can be optimized)
    for (const bookId of selectedItems) {
      console.log("Dispatching removeItemFromCart for:", bookId);
      // Optionally, you can dispatch each item removal one by one
      await dispatch(removeItemFromCart(bookId));  // Ensure sequential removal
    }

    // After all items are removed, dispatch the bulk removal action
    await dispatch(bulkRemoveItemsFromCart(selectedItems));

    // Clear selected items after removal
    setSelectedItems([]);

    // Notify user of success
    message.success("Selected items removed from cart.", 1);

  } catch (error) {
    // Handle any errors
    message.error("Error removing selected items.", 1);
    console.error("Error during bulk removal:", error);
    }
  }

  const handleCheckout = () => {
    setCheckoutBtnClick(!isCheckoutBtnClick);
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-8 list-container-box">
        {cartItems.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-500">
            No items in your cart.
          </div>
        ) : (
          <div className="space-y-6">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cartItems.length}
                      onChange={() => {
                        if (selectedItems.length === cartItems.length) {
                          setSelectedItems([]);
                        } else {
                          setSelectedItems(
                            cartItems.map((item) => item.bookId)
                          );
                        }
                      }}
                    />
                  </th>
                  <th className="p-4 text-left">Item</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.bookId} className="border-b">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.bookId)}
                        onChange={() => handleCheckboxChange(item.bookId)}
                      />
                    </td>
                    <td className="p-4 flex items-center">
                      <img
                        src={item.coverImageUrl}
                        alt={item.bookName}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{item.bookName}</h3>
                      </div>
                    </td>
                    <td className="p-4 font-mono">₹{item.price}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="px-3 py-1 bg-gray-300 rounded-md quantity-btn"
                          onClick={() =>
                            handleQuantityChange(item.bookId, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.bookId,
                              parseInt(e.target.value, 10) || 1
                            )
                          }
                          className="w-16 text-center border border-gray-300 rounded-md"
                        />
                        <button
                          className="px-3 py-1 bg-gray-300 rounded-md quantity-btn"
                          onClick={() =>
                            handleQuantityChange(item.bookId, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleRemoveItem(item.bookId)}
                        className="text-red-500 font-semibold"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={handleBulkRemove}
                className="px-4 py-1 cursor-point rm-select-btn"
                disabled={selectedItems.length === 0}
              >
                Remove Selected
              </button>
              <div className="text-xl font-semibold">
                Total: ₹
                {calculateTotal(cartItems)}
              </div>
            </div>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      {isCheckoutBtnClick && (
        <Checkout
          calculateTotal={calculateTotal}
        />
      )}
    </div>
  );
};

export default Cart;
