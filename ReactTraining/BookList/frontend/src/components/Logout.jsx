import React from "react";
import sweetAlert from "./sweetNotification";
import { useNavigate } from "react-router-dom";


const Logout = () => {

  const navigate=useNavigate();

  const handleLogout = async() => {
    const response=await sweetAlert();
    if(!response.isConfirmed)return;
    localStorage.clear();
    navigate('/login');
  };

  return (

      <button
        onClick={handleLogout}
        className="px-2 py-1 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
      >
        Logout
      </button>

  );
};

export default Logout;
