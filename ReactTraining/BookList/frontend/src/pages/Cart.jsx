import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartDetails';
import Navbar from '../components/Navbar';
import { message } from 'antd';
import sweetAlert from '../components/sweetNotification';
import { FaTrash } from "react-icons/fa";
import Checkout from '../components/Checkout';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartData.cartItems);
  const [isCheckoutBtnClick,setCheckoutBtnClikc]=useState(false);
  
  const [selectedItems, setSelectedItems] = useState([]); // State to track selected items


  const handleQuantityChange = (bookId, quantity) => {
    if (quantity < 1) {
      message.error("Quantity cannot be less than 1.", 1);
      return;
    }
    dispatch(updateQuantity({ bookId, quantity }));
  };

  const handleRemoveItem = async (bookId) => {
    const response = await sweetAlert();
    if (!response.isConfirmed) return;

    dispatch(removeFromCart(bookId));
    message.success("Item removed from cart.", 1);
  };

  // Handle selection change (checkbox)
  const handleCheckboxChange = (bookId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(bookId)) {
        return prevSelected.filter(id => id !== bookId);
      } else {
        return [...prevSelected, bookId];
      }
    });
  };

  const handleBulkRemove = async () => {
    const response = await sweetAlert();
    if (!response.isConfirmed) return;

    selectedItems.forEach(bookId => {
      dispatch(removeFromCart(bookId));
    });
    setSelectedItems([]); 
    message.success("Selected items removed from cart.", 1);
  };

  const handleCheckout=()=>{
    setCheckoutBtnClikc(!isCheckoutBtnClick);
  }

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
            {/* Cart Table */}
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
                          setSelectedItems(cartItems.map(item => item.bookId)); // Select all
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
                          onClick={() => handleQuantityChange(item.bookId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          readOnly
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.bookId, parseInt(e.target.value))}
                          className="w-16 text-center border border-gray-300 rounded-md"
                          min="1"
                        />
                        <button
                          className="px-3 py-1 bg-gray-300 rounded-md quantity-btn"
                          onClick={() => handleQuantityChange(item.bookId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4">₹{(item.price * item.quantity).toFixed(2)}</td>
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

        {/* Bulk Remove and Total Price */}
        {cartItems.length > 0 && (
          <div className="mt-8 flex justify-between items-center">
            <div className="flex space-x-4">
              {/* Bulk Remove Button */}
              <button
                onClick={handleBulkRemove}
                className="px-4 py-1 cursor-point rm-select-btn"
                disabled={selectedItems.length === 0}
              >
                Remove Selected
              </button>
              <div className="text-xl font-semibold">
                Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      {isCheckoutBtnClick && <Checkout/>}
    </div>
  );
};

export default Cart;
