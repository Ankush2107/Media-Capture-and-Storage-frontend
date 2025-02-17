import MediaUpload from '../components/media/MediaUpload';
import MediaFilter from '../components/media/MediaFilter';
import MediaGrid from '../components/media/MediaGrid';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Media
        </h1>
        <MediaUpload />
      </div>
      
      <div className="space-y-6">
        <MediaFilter />
        <MediaGrid />
      </div>
    </div>
  );
};

export default Dashboard;