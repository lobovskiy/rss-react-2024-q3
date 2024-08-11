import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface SelectedPeopleState {
  ids: string[];
}

const initialState: SelectedPeopleState = {
  ids: [],
};

const selectedPeopleSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addSelectedPerson(state, action: PayloadAction<string>) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeSelectedPerson(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    clearSelectedPeople(state) {
      state.ids = initialState.ids;
    },
  },
});

export const { addSelectedPerson, removeSelectedPerson, clearSelectedPeople } =
  selectedPeopleSlice.actions;
export default selectedPeopleSlice.reducer;
