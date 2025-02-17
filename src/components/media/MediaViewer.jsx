import { 
  Dialog, 
  DialogContent, 
  IconButton, 
  Box 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MediaViewer = ({ open, onClose, media }) => {
  console.log("MediaViewer props:", { open, media });
  if (!media) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
    >
        <DialogContent 
        sx={{ 
          p: 0,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.9)',
          position: 'relative'
        }}
      >
      <IconButton
        onClick={onClose}
        sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }
      }}
      >
        <CloseIcon />
      </IconButton>
      <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        
          {media.type === 'image' ? (
             <img
             src={media.url}
             alt=""
             style={{
               maxWidth: '100%',
               maxHeight: '100%',
               objectFit: 'contain',
               backgroundColor: 'white'
             }}
            />
          ) : (
            <video
            src={media.url}
            controls
            autoPlay
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              backgroundColor: 'black'
            }}
            />
          )}
      
      </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewer;