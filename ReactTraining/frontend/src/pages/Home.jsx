import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookList from '../components/BookList';

const Home = () => {
  return (
    <div className="flex h-screen">

      <Navbar></Navbar>

      <div className="flex-1 p-8">

        <div className="bg-gray-100 h-full rounded-lg p-8">
          <BookList/>
        </div>

      </div>

    </div>
  );
};

export default Home;