import { configureStore } from '@reduxjs/toolkit';

import countriesSlice from './countries/slice';
import tilesSlice from './tiles/slice';

export const store = configureStore({
  reducer: {
    [countriesSlice.name]: countriesSlice.reducer,
    [tilesSlice.name]: tilesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
