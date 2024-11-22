import React from 'react';
import { FaHome, FaBook, FaUser, FaInfoCircle } from 'react-icons/fa'; // Import icons from react-icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="w-30 text-white flex flex-col items-center p-4" style={{background:'#002244'}}>
        {/* Logo */}
        <div className="text-center mb-8">
          <h4 className="text-white text-lg font-semibold">BookShelf</h4>
        </div>
        
        {/* Menu */}
        <div className="space-y-4">
          <Link to="/" className="flex flex-col items-center cursor-pointer">
            <FaHome size={24} />
            <span className="text-sm mt-2">Home</span>
          </Link>
          <Link to="/book" className="flex flex-col items-center cursor-pointer">
            <FaBook size={24} />
            <span className="text-sm mt-2">Books</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center cursor-pointer">
            <FaUser size={24} />
            <span className="text-sm mt-2">Profile</span>
          </Link>  
          <Link to="/about" className="flex flex-col items-center cursor-pointer">
            <FaInfoCircle size={24} />
            <span className="text-sm mt-2">About</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
