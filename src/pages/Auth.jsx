import { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 border-b">
          <button
            onClick={() => setActiveTab('login')}
            className={`pb-4 px-4 text-sm font-medium transition-colors duration-200
              ${activeTab === 'login'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`pb-4 px-4 text-sm font-medium transition-colors duration-200
              ${activeTab === 'register'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Register
          </button>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;