import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCampers } from '../services/api';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (filters, { rejectWithValue }) => {
    try {
      const data = await getCampers(filters);
      return data;
    } catch (error) {
      // 404 means no results found, not an error
      if (error.response && error.response.status === 404) {
        return { total: 0, items: [] };
      }
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        // Clear items when starting a new search
        state.items = [];
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // API returns {total: number, items: array}
        state.items = action.payload.items || action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // Clear items on error
        state.items = [];
      });
  },
});

export default campersSlice.reducer;
