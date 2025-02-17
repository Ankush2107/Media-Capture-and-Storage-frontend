// NotificationContext.js
import { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 3000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`
              flex items-center justify-between p-4 rounded-lg shadow-lg
              transform transition-all duration-300 ease-in-out
              ${type === 'success' ? 'bg-green-500 text-white' : ''}
              ${type === 'error' ? 'bg-red-500 text-white' : ''}
              ${type === 'warning' ? 'bg-yellow-500 text-white' : ''}
              ${type === 'info' ? 'bg-blue-500 text-white' : ''}
            `}
            style={{
              animation: 'slideIn 0.3s ease-out forwards',
            }}
          >
            <span className="mr-4">{message}</span>
            <button
              onClick={() => removeNotification(id)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Custom hook for showing notifications
export const useSnackbarHook = () => {
  const { showNotification } = useNotification();
  return { showNotification };
};