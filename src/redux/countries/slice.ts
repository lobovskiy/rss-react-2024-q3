import { createSlice } from '@reduxjs/toolkit';

import { COUNTRY_LIST } from '../../constants.ts';

export interface CountriesState {
  list: string[];
}

const initialState: CountriesState = {
  list: COUNTRY_LIST,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice;
