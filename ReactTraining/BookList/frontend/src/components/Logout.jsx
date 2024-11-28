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
        style={{background:"black",fontFamily:"cursive"}}
        className="px-2 py-1 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2"
      >
        Logout
      </button>

  );
};

export default Logout;
