import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logoutAsync } from '../../redux/authSlice';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span 
              className="text-xl font-bold text-indigo-600 cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              Media Storage
            </span>
          </div>

          {/* Show logout button if either user or token exists */}
          {(user || token) && (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent 
                         text-sm font-medium rounded-md text-white bg-indigo-600 
                         hover:bg-indigo-700 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;