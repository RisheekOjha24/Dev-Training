import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const BookDetails = () => {
  const { id } = useParams(); // Get the book id from the URL
  const [book, setBook] = useState(null);

  // Fetch the book data based on the id
  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log("bookid ", id);
        const response = await axios.get(`http://localhost:3001/book/${id}`);
        console.log(response.data);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching the book:", error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-8">
        <div className="bg-gray-100 h-full rounded-lg p-8 flex list-container-box">
          {book ? (
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{book.title}</h2>
              <p className="mt-4 text-lg">Author: {book.author}</p>
              <p className="mt-2 text-lg">Type: {book.type}</p>
              {/* Display ISBN and Published Date */}
              {book.isbn && <p className="mt-2 text-lg">ISBN: {book.isbn}</p>}
           
                <p className="mt-2 text-lg">
                  Published:{" "}              
                  {new Date(book.publication_date).toLocaleDateString()}
                </p>
    
              {/* Show description */}
              <p className="mt-4">{book.description}</p>
            </div>
          ) : (
            <p>Loading book details...</p>
          )}

          {/* Image section */}
          {book?.cover_image_url && (
            <div className="flex-none ml-8">
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="w-72 h-96 object-cover rounded-md"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
