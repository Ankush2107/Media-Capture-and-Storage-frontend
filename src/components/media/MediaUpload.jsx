import { useState } from 'react';
import { 
  Button, 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from 'react-redux';
import { uploadMedia } from '../../redux/mediaSlice';
import useSnackbarHook from '../../hooks/useSnackbarHook';
const MediaUpload = () => {
  const dispatch = useDispatch();
  const { showNotification } = useSnackbarHook();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview URL for images and videos
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
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
    setOpen(false);
    setFile(null);
    setPreview('');
    setError('');
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={() => setOpen(true)}
      >
        Upload Media
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Media</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <input
              accept="image/*,video/*"
              style={{ display: 'none' }}
              id="media-file"
              type="file"
              onChange={handleFileSelect}
            />
            <label htmlFor="media-file">
              <Button variant="outlined" component="span">
                Choose File
              </Button>
            </label>

            {preview && (
              <Box sx={{ mt: 2 }}>
                {file?.type.startsWith('image/') ? (
                  <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                ) : (
                  <video src={preview} controls style={{ maxWidth: '100%', maxHeight: '300px' }} />
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleUpload} 
            disabled={!file || loading}
            variant="contained"
          >
            {loading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MediaUpload;