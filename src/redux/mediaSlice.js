import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/media`;

export const fetchMedia = createAsyncThunk(
  'media/fetchMedia',
  async ({ page = 1, limit = 10, type = '' } = {}, { rejectWithValue }) => {
    try {
        console.log('Token being sent:', localStorage.getItem('token'));
      const response = await axios.get(
        `${API_URL}?page=${page}&limit=${limit}${type ? `&type=${type}` : ''}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      console.log('API Response:', response.data); 
      return response.data;
    } catch (error) {
        console.error('API Error:', error); 
        return rejectWithValue(error.response?.data || { message: 'Failed to fetch media' });
    }
  }
);

export const uploadMedia = createAsyncThunk(
  'media/uploadMedia',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMedia = createAsyncThunk(
  'media/deleteMedia',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filter: '',
    page: 1,
    hasMore: true,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 1;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.page === 1 
          ? action.payload 
          : [...state.items, ...action.payload];
        state.hasMore = action.payload.length === 10;
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(uploadMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setFilter } = mediaSlice.actions;
export default mediaSlice.reducer;