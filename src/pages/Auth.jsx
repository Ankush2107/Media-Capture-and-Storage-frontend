import { useState } from 'react';
import { Container, Paper, Tabs, Tab, Box } from '@mui/material';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Auth = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {value === 0 ? <Login /> : <Register />}
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;