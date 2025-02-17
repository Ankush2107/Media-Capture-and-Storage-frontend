import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 404 with gradient */}
        <h1 className="text-8xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          404
        </h1>
        
        {/* Message */}
        <p className="mt-4 text-xl text-gray-600">
          Oops! Page not found
        </p>
        
        {/* Description */}
        <p className="mt-2 text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        {/* Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base 
                   font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   transition-colors duration-200"
        >
          Go Back Home
        </button>
      </div>
      
      {/* Optional: Decorative elements */}
      <div className="mt-12 flex justify-center space-x-8">
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full 
                      transform -rotate-45"></div>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full 
                      transform rotate-45"></div>
      </div>
    </div>
  );
};

export default NotFound;