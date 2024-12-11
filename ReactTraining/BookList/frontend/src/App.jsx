import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SearchBooks from './pages/SearchBooks';
import BookAPIDetails from './pages/BookAPIDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { useEffect } from "react";
import { fetchCartItems } from "../store/cartDetails";
import { useDispatch } from 'react-redux';
import ProtectedRoutes from '../utils/ProtectedRoutes';

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);
  
  return (
    <Router>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<Home/>} />
            <Route path='/about' element={<About/>}/>
            <Route path="/book/api/:id" element={<BookAPIDetails/>}/>
            <Route path='/search-books' element={<SearchBooks/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Route>

        </Routes>
    </Router>
  );
}

export default App;
