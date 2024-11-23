import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {

  const [selectedType, setSelectedType] = useState('All');

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const booksData = [
    { id: 1, title: "Book 1", type: "Fiction", description: "This is a fiction book" },
    { id: 2, title: "Book 2", type: "Non-Fiction", description: "This is a non-fiction book" },
    { id: 3, title: "Book 3", type: "Fiction", description: "Another fiction book" },
    { id: 4, title: "Book 4", type: "Science", description: "This is a science book" },
    { id: 5, title: "Book 5", type: "Comedy", description: "This is a comedy book" },
  ];

  // Filter books based on selected type
  const filteredBooks = booksData.filter(book => selectedType === 'All' || book.type === selectedType);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Books List</h2>

      {/* Tailwind Dropdown for filtering book types */}
      <select
        className="w-48 p-2 border border-gray-300 rounded-md mb-6"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="All">All</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Science">Science</option>
        <option value="Comedy">Comedy</option>
      </select>

      {/* Displaying each book as a card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <p className="text-gray-600">{book.description}</p>
            </div>
            <div className="p-4 bg-gray-100">
              <Link
                to={`/book/${book.id}`}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
