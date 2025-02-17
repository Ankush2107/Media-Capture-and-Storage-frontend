import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uploadMedia } from '../../redux/mediaSlice';
import { Upload, X, Image as ImageIcon, FileVideo } from 'lucide-react';
import useSnackbarHook from '../../hooks/useSnackbarHook';

const MediaUpload = () => {
  const dispatch = useDispatch();
  const { showNotification } = useSnackbarHook();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type.startsWith('video/'))) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  }, []);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      await dispatch(uploadMedia(formData)).unwrap();
      showNotification('Media uploaded successfully');
      handleClose();
    } catch (err) {
      setError(err.message || 'Upload failed');
      showNotification(err.message || 'Upload failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setFile(null);
    setPreview('');
    setError('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg
                 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                 transition-colors duration-200"
      >
        <Upload className="h-5 w-5 mr-2" />
        Upload Media
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Upload Media</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              {!preview ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center
                    ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
                    transition-colors duration-200`}
                >
                  <input
                    type="file"
                    id="media-file"
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">
                    Drag and drop your media here, or{' '}
                    <label
                      htmlFor="media-file"
                      className="text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      browse
                    </label>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Supports images and videos
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {file?.type.startsWith('image/') ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-[300px] w-full object-contain rounded-lg"
                    />
                  ) : (
                    <video
                      src={preview}
                      controls
                      className="max-h-[300px] w-full object-contain rounded-lg"
                    />
                  )}
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview('');
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full
                             hover:bg-red-600 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-4 border-t">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className={`px-4 py-2 rounded-md ${
                  !file || loading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white transition-colors duration-200`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Upload'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaUpload;