import { createSlice } from '@reduxjs/toolkit';

export interface CountriesState {
  list: string[];
}

const initialState: CountriesState = {
  list: [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'India',
    'China',
    'Brazil',
    'South Africa',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice;
