import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-8 bg-gradient-to-r from-blue-50 to-gray-100">
        <div className="bg-white shadow-md h-full rounded-lg p-8 list-container-box flex flex-col items-center justify-center">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to BookShelf
            </h1>
            <p className="text-lg text-gray-600">
              Discover, explore, and immerse yourself in the world of books. 
              A place where stories come alive!
            </p>
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300" onClick={() => (navigate('/search-books'))}>
              Start Exploring
            </button>
          </div>

          {/* Illustration Section */}
          <div className="mt-10 flex flex-col items-center">
            <div className="w-3/4 sm:w-1/2">
         
            </div>
            <p className="mt-6 text-gray-500 text-center">
              Join millions of readers and explore your next favorite book.
            </p>
          </div>

          {/* Categories Section */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {['Fiction', 'Non-Fiction', 'Science', 'History', 'Romance', 'Fantasy'].map((category) => (
              <div
                key={category}
                className="p-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-200 text-center"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
