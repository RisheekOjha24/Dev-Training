import React, { Suspense, useState } from 'react';
import Navbar from '../components/Navbar';
// import BookList from '../components/BookList';
const BookList = React.lazy(()=> import("../components/BookList"));

const Home = () => {
  return (
    <div className="flex h-screen">
      <Navbar></Navbar>

      <div className="flex-1 p-8">
        <div className="bg-gray-100 h-full rounded-lg p-8 list-container-box">
          <Suspense fallback={<div>Loading books...</div>}>
            <BookList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;