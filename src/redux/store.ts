import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/apiService';
import selectedPeopleReducer from './selectedPeople/slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    selectedPeople: selectedPeopleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
