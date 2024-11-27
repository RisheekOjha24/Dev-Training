import React from 'react';
import { FaHome, FaSearch, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useSelector } from 'react-redux'; // Import useSelector for accessing Redux store
import Logout from './Logout';

const Navbar = () => {
  const username = useSelector((state) => state.userData.username);
  const cartItems = useSelector((state) => state.cartData.cartItems);
  const cartItemCount = cartItems.length;

  return (
    <>
      {/* Sidebar */}
      <div className="w-30 sidebar text-white flex justify-between flex-col items-center p-4" style={{background:'#002244'}}>
    
        <div className="text-center mb-8">
          <h4 className="text-white text-lg font-semibold">BookShelf</h4>
          <h4 className='text-white font-bold mt-8'>Welcome {username}</h4>
        </div>
        
        {/* Menu */}
        <div className="space-y-4">
          <Link to="/" className="flex flex-col items-center cursor-pointer">
            <FaHome size={24} />
            <span className="text-sm mt-2">Home</span>
          </Link>
    

          <Link to="/search-books" className="flex flex-col items-center cursor-pointer">
            <FaSearch size={24} />
            <span className="text-sm mt-2">Search</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center cursor-pointer relative">
            <FaShoppingCart size={24} />
            <span className="text-sm mt-2">Cart</span>
            {/* Cart item count badge */}
            {cartItemCount > 0 && (
              <span className="badge-cart bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <Link to="/about" className="flex flex-col items-center cursor-pointer">
            <FaInfoCircle size={24} />
            <span className="text-sm mt-2">About</span>
          </Link>
          
          <Logout />
        </div>
      </div>
    </>
  );
}

export default Navbar;
