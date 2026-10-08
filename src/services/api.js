import axios from 'axios';

const API_BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCampers = async (filters = {}, pagination = {}) => {
  const params = new URLSearchParams();

  if (filters.location) {
    params.append('location', filters.location);
  }

  if (filters.vehicleType) {
    // Map UI values to API values: {'fullyIntegrated', 'panelTruck', 'alcove'}
    const formMapping = {
      alcove: 'alcove',
      panelVan: 'panelTruck',
      integrated: 'fullyIntegrated',
      semiIntegrated: 'semiIntegrated', // Does not exist in current API but per requirements
    };
    params.append('form', formMapping[filters.vehicleType] || filters.vehicleType);
  }

  if (filters.engine) {
    // Map UI values: diesel, petrol, hybrid, electric
    params.append('engine', filters.engine);
  }

  if (filters.transmission) {
    // Map UI values: automatic, manual
    params.append('transmission', filters.transmission);
  }

  // Pagination
  if (pagination.page) {
    params.append('page', pagination.page);
  }
  if (pagination.limit) {
    params.append('limit', pagination.limit);
  }

  const response = await api.get('/campers', { params });
  return response.data;
};

export const getCamperById = async (id) => {
  const response = await api.get(`/campers/${id}`);
  return response.data;
};
