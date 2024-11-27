import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './pages/BookDetails';
import Home from './pages/Home';
import About from './pages/About';
import ContextWork from './pages/ContextWork';
import SearchBooks from './pages/SearchBooks';
import BookAPIDetails from './pages/BookAPIDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/book/api/:id" element={<BookAPIDetails/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/word' element={<ContextWork/>}/>
          <Route path='/search-books' element={<SearchBooks/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
    </Router>
  );
}

export default App;
