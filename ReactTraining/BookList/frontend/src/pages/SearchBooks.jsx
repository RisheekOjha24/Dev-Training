import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Spin } from "antd";

const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // Spinner for infinite scroll
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [fetchedBookIds, setFetchedBookIds] = useState(new Set());
  const observerRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (searched) {
      fetchBooks();
    } else {
      fetchRandomBooks();
    }
  }, [page, genre, searched]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !loading) {
          setIsFetching(true);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isFetching, loading]);

  const fetchRandomBooks = async () => {
    setLoading(true);
    try {
      const genreFilter = genre ? `+subject:${genre}` : "";
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=book${genreFilter}&orderBy=newest&maxResults=10&startIndex=${
          (page - 1) * 10
        }&key=${API_KEY}`
      );

      const newBooks = (response.data.items || []).filter(
        (book) => !fetchedBookIds.has(book.id)
      );

      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      setFetchedBookIds((prevIds) => {
        const updatedIds = new Set(prevIds);
        newBooks.forEach((book) => updatedIds.add(book.id));
        return updatedIds;
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setIsFetching(false); // Reset spinner state
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const genreFilter = genre ? `+subject:${genre}` : "";
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${genreFilter}&maxResults=10&startIndex=${
          (page - 1) * 10
        }&key=${API_KEY}`
      );

      const newBooks = (response.data.items || []).filter(
        (book) => !fetchedBookIds.has(book.id)
      );

      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      setFetchedBookIds((prevIds) => {
        const updatedIds = new Set(prevIds);
        newBooks.forEach((book) => updatedIds.add(book.id));
        return updatedIds;
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setIsFetching(false); // Reset spinner state
    }
  };

  const handleSearchClick = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setSearched(true);
    setBooks([]);
    setFetchedBookIds(new Set());
    setPage(1);

    try {
      const genreFilter = genre ? `+subject:${genre}` : "";
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${genreFilter}&maxResults=10`
      );

      const newBooks = response.data.items || [];
      setBooks(newBooks);
      setFetchedBookIds(new Set(newBooks.map((book) => book.id)));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (id) => {
    window.open(`/book/api/${id}`, "_blank");
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setBooks([]);
    setFetchedBookIds(new Set());
    setPage(1);
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-8">
        <div className="bg-gray-100 h-full rounded-lg p-8 list-container-box">
          <div className="mb-4 flex items-center bg-white justify-center">
            <input
              type="text"
              placeholder="Search by book name, author name, publisher or isbn number"
              className="p-2 border border-gray-300 rounded-md search-box"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearchClick}
              className="ml-2 p-2 bg-black text-white rounded-md search-btn"
            >
              Search
            </button>

            <select
              value={genre}
              onChange={handleGenreChange}
              className="ml-4 p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Genres</option>
              <option value="fiction">Fiction</option>
              <option value="nonfiction">Non-Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="romance">Romance</option>
              <option value="history">History</option>
              <option value="science">Science</option>
              <option value="technology">Technology</option>
            </select>
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {books.length > 0 ? (
                books.map((book, index) => {
                  const price = book.volumeInfo.pageCount
                    ? book.volumeInfo.pageCount + 88
                    : 89;

                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer card-hover mb-10 relative"
                      onClick={() => handleBookClick(book.id)}
                    >
                      <div className="h-40 overflow-hidden flex justify-center items-center bg-gray-50 ">
                        <img
                          src={book.volumeInfo.imageLinks?.thumbnail}
                          alt={book.volumeInfo.title}
                          className="h-32 w-auto object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">
                          {book.volumeInfo.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {book.volumeInfo.authors?.join(", ")}
                        </p>
                        <p className="text-lg font-semibold font-mono text-blue-600 bottom-0 absolute">
                          ₹{price}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>{loading ? <>Loading...</> : <>No result found</>}</div>
              )}
            </div>

            <div ref={observerRef} />
            {isFetching && (
              <div className="flex justify-center mt-6">
                <div className="loader" />
                <Spin size="large"/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
