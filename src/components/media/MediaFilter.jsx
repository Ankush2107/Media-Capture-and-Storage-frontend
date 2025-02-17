import { 
  Box, 
  ToggleButton, 
  ToggleButtonGroup 
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/Videocam';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/mediaSlice';

const MediaFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.media);

  const handleFilterChange = (event, newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="media filter"
      >
        <ToggleButton value="" aria-label="all">
          All
        </ToggleButton>
        <ToggleButton value="image" aria-label="images">
          <ImageIcon sx={{ mr: 1 }} /> Images
        </ToggleButton>
        <ToggleButton value="video" aria-label="videos">
          <VideoIcon sx={{ mr: 1 }} /> Videos
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
export default MediaFilter;