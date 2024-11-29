import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { message, Spin } from 'antd';
import { addToCart } from "../../store/cartDetails";
import { useDispatch } from "react-redux";

const BookAPIDetails = () => {

  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loadingSimilarBooks, setLoadingSimilarBooks] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate=useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Fetching book details from Google Books API through id
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
        );
        setBook(response.data);

        // Fetch similar books based on genre
        const genres = response.data.volumeInfo.categories || [];
        
        if (genres.length > 0) {
          fetchSimilarBooks(genres[0]); // Using the first genre as filter
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  // Fetch similar books based on genre
  const fetchSimilarBooks = async (genre) => {
    
    setLoadingSimilarBooks(true);

    try {
      console.log("Sending genre = ",genre);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=5&key=${API_KEY}`
      );
      setSimilarBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching similar books:", error);
    } finally {
      setLoadingSimilarBooks(false);
    }
  };

  // Handle show more/less functionality for description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  
  const calculateBookPrice = (pageCount) => {
    if (pageCount) {
      return pageCount + 88; // Price = pageCount + 88
    }
    return 0; // Default price if no page count
  };


  const handleAddToCart = () => {
    if (book) {
      const price = calculateBookPrice(book.volumeInfo.pageCount);
      const bookDetails = {
        bookId: book.id,
        bookName: book.volumeInfo.title,
        coverImageUrl: book.volumeInfo.imageLinks?.thumbnail,
        price,
        quantity: quantity
      };

      message.success("Item added to cart",1)
      dispatch(addToCart(bookDetails));
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };


  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-8">
        <div className="bg-gray-100 h-full rounded-lg p-8 list-container-box">
          {loading ? (
            <p>Loading book details...</p>
          ) : book ? (
            <div className="flex flex-wrap">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <div className="flex-none max-w-xs mb-8">
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-full h-auto object-contain rounded-md"
                    loading="lazy"
                  />

                <button
                  onClick={handleAddToCart}
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md cart-add-btn"
                >
                  Add to Cart
                </button>
                </div>
              )}

              {/* Book Info */}
              <div className="flex-1 ml-8">
                <h1 className="text-3xl font-bold">{book.volumeInfo.title}</h1>
                {book.volumeInfo.authors && (
                  <p className="mt-4 text-lg">
                    <strong>Author(s):</strong> {book.volumeInfo.authors.join(", ")}
                  </p>
                )}
                {book.volumeInfo.publishedDate && (
                  <p className="mt-2 text-lg">
                    <strong>Published:</strong> {book.volumeInfo.publishedDate}
                  </p>
                )}
                {book.volumeInfo.publisher && (
                  <p className="mt-2 text-lg">
                    <strong>Publisher:</strong> {book.volumeInfo.publisher}
                  </p>
                )}
                {book.volumeInfo.categories && (
                  <p className="mt-2 text-lg">
                    <strong>Category:</strong> {book.volumeInfo.categories.join(", ")}
                  </p>
                )}
                {book.volumeInfo.averageRating && (
                  <p className="mt-2 text-lg">
                    <strong>Rating:</strong> {book.volumeInfo.averageRating} / 5
                  </p>
                )}
                {book.volumeInfo.pageCount && (
                  <p className="mt-2 text-lg">
                    <strong>Page Count:</strong> {book.volumeInfo.pageCount}
                  </p>
                )}

                {/* Book Price */}
                {book.volumeInfo.pageCount && (
                  <p className="mt-2 text-lg">
                    <strong>Price:</strong> ₹ {calculateBookPrice(book.volumeInfo.pageCount)}
                  </p>
                )}

                {/* Quantity Selection */}
                <div className="mt-4">
                  <button
                    onClick={decreaseQuantity}
                    className="px-4 py-2 bg-gray-300 text-white rounded-l-md quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    readOnly
                    className="px-4 py-2 text-center w-16 border-t border-b border-gray-300"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="px-4 py-2 bg-gray-300 text-white rounded-r-md quantity-btn"
                  >
                    +
                  </button>
                </div>

                {/* Description */}
                <div className="mt-4 text-gray-700">

                  {book.volumeInfo.description && book.volumeInfo.description.length > 500 ? (
                    <>
                      <p>
                        {showFullDescription
                          ? <span dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
                          : <span dangerouslySetInnerHTML={{ __html: book.volumeInfo.description.slice(0, 500) + "..." }} />}
                      </p>
                      <button
                        onClick={toggleDescription}
                        className="text-blue-500 mt-2"
                      >
                        {showFullDescription ? "Show Less" : "Show More"}
                      </button>
                    </>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
                  )}
                  
                </div>

              </div>
            </div>
          ) : (
            <p>No book details found.</p>
          )}

          {/* Similar Books */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Similar Books</h2>

            {/* Show spinner while fetching similar books */}
            {loadingSimilarBooks ? (
              <div className="flex justify-center">
                <Spin size="large" />
              </div>
            ) : (
              <div className="similar-books-container">
                {similarBooks.length > 0 ? (
                  similarBooks.map((similarBook,index) => (
                    <div
                      key={index}
                      className="similar-book-item"
                      onClick={() => navigate(`/book/api/${similarBook.id}`)}
                    >
                      <div className="h-40 overflow-hidden flex justify-center items-center bg-gray-50">
                        <img
                          src={similarBook.volumeInfo.imageLinks?.thumbnail}
                          alt={similarBook.volumeInfo.title}
                          className="object-contain"
                        />
                      </div>
                      <p className="font-bold text-center mt-4">{similarBook.volumeInfo.title}</p>
                    </div>
                  ))
                ) : (
                  <p>No similar books found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAPIDetails;
