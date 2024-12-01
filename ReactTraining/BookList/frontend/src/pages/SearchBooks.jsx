import React, { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [fetchedBookIds, setFetchedBookIds] = useState(new Set());
  const [hasMore, setHasMore] = useState(true); // To track if more data is available
  const observerRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery === "") {
      // If search query is empty, fetch random books like on page load
      fetchRandomBooks();
    } else if (searched) {
      // If there is a search query, fetch books based on the query
      fetchBooks();
    }
  }, [page, genre, searched, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !loading && hasMore) {
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
  }, [isFetching, loading, hasMore]);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const genreFilter = genre ? `+subject:${genre}` : "";
      const query = encodeURIComponent(searchQuery); // Encode the query
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}${genreFilter}&maxResults=10&startIndex=${
          (page - 1) * 10
        }&key=${API_KEY}`
      );

      if (response.data.totalItems === 0) {
        setHasMore(false);
      } else {
        const newBooks = (response.data.items || []).filter(
          (book) => !fetchedBookIds.has(book.id)
        );

        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
        setFetchedBookIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          newBooks.forEach((book) => updatedIds.add(book.id));
          return updatedIds;
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [searchQuery, genre, page, API_KEY, fetchedBookIds]);

  const fetchRandomBooks = useCallback(async () => {
    setLoading(true);
    try {
      const genreFilter = genre ? `+subject:${genre}` : "";
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=book${genreFilter}&orderBy=newest&maxResults=10&startIndex=${
          (page - 1) * 10
        }&key=${API_KEY}`
      );

      if (response.data.totalItems === 0) {
        setHasMore(false);
      } else {
        const newBooks = (response.data.items || []).filter(
          (book) => !fetchedBookIds.has(book.id)
        );

        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
        setFetchedBookIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          newBooks.forEach((book) => updatedIds.add(book.id));
          return updatedIds;
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [genre, page, API_KEY, fetchedBookIds]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setLoading(true);
      setSearched(true);
      setBooks([]); // Clear books
      setFetchedBookIds(new Set()); // Clear fetched book IDs
      setPage(1); // Reset to the first page
      setHasMore(true); // Reset pagination

      const genreFilter = genre ? `+subject:${genre}` : "";
      const encodedQuery = encodeURIComponent(query);

      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}${genreFilter}&maxResults=10&key=${API_KEY}`
        )
        .then((response) => {
          if (response.data.totalItems === 0) {
            setHasMore(false);
          } else {
            const newBooks = response.data.items || [];
            setBooks(newBooks);
            setFetchedBookIds(new Set(newBooks.map((book) => book.id)));
          }
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000),
    [genre]
  );
const handleSearchQueryChange = (e) => {
  const value = e.target.value; // Remove .trim() here to allow spaces
  setSearchQuery(value);

  if (value === "") {
    setSearched(false);
    setBooks([]); // Clear the books
    setFetchedBookIds(new Set()); // Reset the fetched book IDs
    setPage(1); // Reset page to 1
    setHasMore(true); // Reset hasMore to true
  } else {
    debouncedSearch(value); // Trigger debounced search
  }
};


  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setBooks([]); // Clear books when genre changes
    setFetchedBookIds(new Set()); // Clear fetched book IDs
    setPage(1); // Reset page to 1
    setHasMore(true); // Reset hasMore to true
  };

  const handleBookClick = (id) => {
    navigate(`/book/api/${id}`);
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-8">
        <div className="bg-gray-100 h-full rounded-lg p-8 list-container-box">
          <div className="mb-4 flex items-center bg-white justify-center">
            <input
              type="text"
              placeholder="Search by book name, author name, publisher or ISBN number"
              className="p-2 border border-gray-300 rounded-md search-box"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
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
                      <div className="h-40 overflow-hidden flex justify-center items-center bg-gray-50">
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
            {isFetching && hasMore && (
              <div className="flex justify-center mt-6">
                <Spin size="large" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
