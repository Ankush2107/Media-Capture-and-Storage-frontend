const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="relative">
        {/* Outer spinning circle */}
        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;