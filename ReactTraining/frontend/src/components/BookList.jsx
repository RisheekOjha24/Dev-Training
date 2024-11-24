import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookList = () => {
  const [booksData, setBooksData] = useState([]); // State for books data
  const [selectedType, setSelectedType] = useState("All"); // State for book type filter

  useEffect(() => {
    // Fetch all books from the correct endpoint (books not book)
    async function getAllBooks() {
      try {
        const response = await axios.get("http://localhost:3001/book"); // Correct endpoint '/books'
        console.log(response);
        setBooksData(response.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    getAllBooks();
  }, []);

  // Handle dropdown selection change
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Filter books based on selected type
  const filteredBooks = booksData.filter(
    (book) => selectedType === "All" || book.type === selectedType
  );

  return (
    <div className="p-6">
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
          <div
            key={book.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden relative"
          >
            <div className="p-4">
              <h3 className="text-xl book-title font-bold mb-6">
                {book.title}
              </h3>
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="w-full h-48 object-cover mb-4"
                loading="lazy"
              />
              <h3 className="mb-4">
                <span className="font-bold">Author </span> {book.author}
              </h3>
            </div>
            <div className="p-2 absolute bottom-0 right-0 text-center">
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
