import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const MediaViewer = ({ open, onClose, media }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, handleKeyDown]);

  if (!media || !open) return null;

  const closeOnBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={closeOnBackdropClick}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 text-white
                 hover:bg-white/20 transition-colors duration-200 focus:outline-none"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Media container */}
      <div className="max-w-[90vw] max-h-[90vh] relative">
        {media.type === 'image' ? (
          <img
            src={media.url}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        ) : (
          <video
            src={media.url}
            controls
            autoPlay
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            controlsList="nodownload"
          >
            <source src={media.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default MediaViewer;