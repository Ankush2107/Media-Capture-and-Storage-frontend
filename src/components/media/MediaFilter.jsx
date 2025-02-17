import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/mediaSlice';
import { Camera, Image, LayoutGrid } from 'lucide-react';

const MediaFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.media);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="mb-6">
      <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
        <button
          onClick={() => handleFilterChange("")}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors duration-200
            ${filter === "" ? 
              "bg-indigo-600 text-white" : 
              "text-gray-500 hover:text-gray-700"}`}
        >
          <LayoutGrid className="h-4 w-4" />
          All
        </button>

        <button
          onClick={() => handleFilterChange("image")}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors duration-200
            ${filter === "image" ? 
              "bg-indigo-600 text-white" : 
              "text-gray-500 hover:text-gray-700"}`}
        >
          <Image className="h-4 w-4" />
          Images
        </button>

        <button
          onClick={() => handleFilterChange("video")}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors duration-200
            ${filter === "video" ? 
              "bg-indigo-600 text-white" : 
              "text-gray-500 hover:text-gray-700"}`}
        >
          <Camera className="h-4 w-4" />
          Videos
        </button>
      </div>
    </div>
  );
};

export default MediaFilter;