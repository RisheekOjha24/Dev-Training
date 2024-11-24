import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './pages/BookDetails';
import Home from './pages/Home';
import About from './pages/About';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path='/about' element={<About/>}/>
        </Routes>
    </Router>
  );
}

export default App;
