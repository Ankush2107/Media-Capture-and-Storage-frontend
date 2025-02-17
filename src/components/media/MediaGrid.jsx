import { useEffect, useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardActions, 
  CardContent, 
  IconButton, 
  Box,
  CircularProgress,
  Typography,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedia, deleteMedia } from '../../redux/mediaSlice';
import MediaViewer from './MediaViewer';
const MediaGrid = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filter } = useSelector(state => state.media);
  const { user } = useSelector(state => state.auth);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    console.log('Current user:', user);
    dispatch(fetchMedia({ page: 1, limit: 10, type: filter }));
  }, [dispatch, filter]);

  useEffect(() => {
    console.log('Media items:', items);
  }, [items]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteMedia(id)).unwrap();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleMediaClick = (media) => {
    console.log("Media clicked:", media);
    setSelectedMedia(media);
  };

  const handleCloseViewer = () => {
    setSelectedMedia(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography>No media files found</Typography>
      </Box>
    );
  }

  return (
    <>
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
        },
        gap: 3,
        padding: 2
      }}
    >
      {items.map((item) => (
        <Card 
          key={item._id}
          onClick={() => handleMediaClick(item)}
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            }
          }}
        >
          <Box onClick={() => handleMediaClick(item)} sx={{ position: 'relative', paddingTop: '75%' }}>
            {item.type === 'image' ? (
              <CardMedia
                component="img"
                image={item.url}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <CardMedia
                component="video"
                src={item.url}
                controls
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            )}
          </Box>
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item.type === 'image' ? 
                <ImageIcon color="primary" /> : 
                <VideoFileIcon color="secondary" />
              }
              <Typography variant="body2" color="text.secondary">
                {new Date(item.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </CardContent>
          <CardActions  sx={{ 
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '8px 0 0 0'
            }} 
            onClick={(e) => e.stopPropagation()} 
            >
            <Tooltip title="Delete">
              <IconButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id);
                  }}
                color="error"
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.04)'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      ))}
    </Box>
      <MediaViewer
      open={Boolean(selectedMedia)}
      onClose={() => {
        console.log("Closing viewer"); // Add this log
        setSelectedMedia(null);
      }}
      media={selectedMedia}
    />
    </>
  );
};

export default MediaGrid;