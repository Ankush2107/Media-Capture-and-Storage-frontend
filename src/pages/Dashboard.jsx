import { Container, Box, Typography } from '@mui/material';
import MediaUpload from '../components/media/MediaUpload';
import MediaFilter from '../components/media/MediaFilter';
import MediaGrid from '../components/media/MediaGrid';
const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" component="h1">
            My Media
            </Typography>
            <MediaUpload />
        </Box>
        <MediaFilter />
        <MediaGrid />
    </Container>
  );
};

export default Dashboard;