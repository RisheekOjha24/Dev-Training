import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoutes = () => {
    const user=useSelector(store=>store.userData.username);
  return (
    user?<Outlet/>:<Navigate to="/login"/>
  )
}

export default ProtectedRoutes