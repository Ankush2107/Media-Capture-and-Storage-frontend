import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/auth`
  : (() => { throw new Error('VITE_API_URL is not defined in environment variables') })();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper function to set auth token
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', credentials);
      if (response.data?.token) {
        setAuthToken(response.data.token);
        return response.data;
      } else {
        return rejectWithValue({ message: 'Token not received from server' });
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data || { 
          message: `Server error: ${error.response.status}` 
        });
      } else if (error.request) {
        return rejectWithValue({ 
          message: 'No response from server. Please check your connection.' 
        });
      } else {
        return rejectWithValue({ 
          message: error.message || 'Failed to make request' 
        });
      }
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/register', userData);
      if (response.data?.token) {
        setAuthToken(response.data.token);
        return response.data;
      } else {
        return rejectWithValue({ message: 'Token not received from server' });
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data || { 
          message: `Server error: ${error.response.status}` 
        });
      } else if (error.request) {
        return rejectWithValue({ 
          message: 'No response from server. Please check your connection.' 
        });
      } else {
        return rejectWithValue({ 
          message: error.message || 'Failed to make request' 
        });
      }
    }
  }
);

// Logout thunk to handle async logout if needed
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { rejectWithValue }) => {
    try {
      // If you have a logout endpoint, you can call it here
      // await api.post('/logout');
      setAuthToken(null);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      setAuthToken(null);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;