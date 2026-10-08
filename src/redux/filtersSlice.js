import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    vehicleType: '',
    engine: '',
    transmission: '',
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
    setEngine: (state, action) => {
      state.engine = action.payload;
    },
    setTransmission: (state, action) => {
      state.transmission = action.payload;
    },
    clearFilters: (state) => {
      state.location = '';
      state.vehicleType = '';
      state.engine = '';
      state.transmission = '';
    },
    resetFilters: (state) => {
      state.location = '';
      state.vehicleType = '';
      state.engine = '';
      state.transmission = '';
    },
  },
});

export const {
  setLocation,
  setVehicleType,
  setEngine,
  setTransmission,
  clearFilters,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
