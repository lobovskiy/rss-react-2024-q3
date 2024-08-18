import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { StoredFormData } from '../../types';

export interface TilesState {
  lastAddedTile: StoredFormData | null;
  list: StoredFormData[];
}

const initialState: TilesState = {
  lastAddedTile: null,
  list: [],
};

const tilesSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    addTile(state, action: PayloadAction<Omit<StoredFormData, 'id'>>) {
      const id = uuid();
      const newTile = { id, ...action.payload };
      state.list.push(newTile);
      state.lastAddedTile = newTile;
    },
    clearLastAddedTile(state) {
      state.lastAddedTile = null;
    },
  },
});

export const { addTile, clearLastAddedTile } = tilesSlice.actions;
export default tilesSlice;
