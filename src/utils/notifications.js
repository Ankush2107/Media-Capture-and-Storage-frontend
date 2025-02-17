import { useSnackbarHook } from '../context/NotificationContext';

export const showNotification = () => {
  const { showNotification } = useSnackbarHook();

  const handleSuccess = () => {
    showNotification('Action completed successfully!', 'success');
  };

  const handleError = () => {
    showNotification('Something went wrong!', 'error');
  };

  const handleWarning = () => {
    showNotification('Please proceed with caution', 'warning');
  };

  const handleInfo = () => {
    showNotification('Here is some useful information', 'info');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSuccess}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-green-500 focus:ring-offset-2"
        >
          Show Success
        </button>

        <button
          onClick={handleError}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-red-500 focus:ring-offset-2"
        >
          Show Error
        </button>

        <button
          onClick={handleWarning}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-yellow-500 focus:ring-offset-2"
        >
          Show Warning
        </button>

        <button
          onClick={handleInfo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2"
        >
          Show Info
        </button>
      </div>
    </div>
  );
};