import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedia, deleteMedia } from '../../redux/mediaSlice';
import { Trash2, Image as ImageIcon, Play } from 'lucide-react';
import MediaViewer from './MediaViewer';
import LoadingSpinner from '../layout/LoadingSpinner';

const VideoThumbnail = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    const currentRef = videoRef.current;
    const handleLoad = () => {/*...*/};
  
    if (currentRef) {
      currentRef.addEventListener('loadeddata', handleLoad);
    }
  
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('loadeddata', handleLoad);
      }
    };
  }, [videoUrl]);

  return (
    <>
     <video 
        ref={videoRef}  // Add ref here
        crossOrigin="anonymous"
        className="hidden"
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" /> {/* Fixed variable name */}
      </video>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </>
  );
};

const MediaGrid = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filter } = useSelector(state => state.media);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    dispatch(fetchMedia({ page: 1, limit: 10, type: filter }));
  }, [dispatch, filter]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await dispatch(deleteMedia(id)).unwrap();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex justify-center mt-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center mt-8">
        <p className="text-gray-500">No media files found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedMedia(item)}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer 
                     transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative pt-[75%] bg-gray-100">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0">
                  <VideoThumbnail videoUrl={item.url} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center
                                  group-hover:bg-indigo-600 transition-colors duration-200">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200">
                <button
                  onClick={(e) => handleDelete(e, item._id)}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-red-500 text-white 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200
                           hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4">
              <div className="flex items-center space-x-2 text-gray-600">
                {item.type === 'image' ? (
                  <ImageIcon className="h-4 w-4 text-indigo-500" />
                ) : (
                  <Play className="h-4 w-4 text-indigo-500" />
                )}
                <span className="text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <MediaViewer
          open={Boolean(selectedMedia)}
          onClose={() => setSelectedMedia(null)}
          media={selectedMedia}
        />
      )}
    </>
  );
};

export default MediaGrid;