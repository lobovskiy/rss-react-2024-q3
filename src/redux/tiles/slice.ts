import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { FormData } from '../../schemas/formSchema.ts';

export interface TilesState {
  addedInLast5SecTile: FormData | null;
  list: FormData[];
}

const initialState: TilesState = {
  addedInLast5SecTile: null,
  list: [],
};

const tilesSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    addTile(state, action: PayloadAction<FormData>) {
      state.list.push(action.payload);
      state.addedInLast5SecTile = action.payload;

      setTimeout(() => {
        state.addedInLast5SecTile = null;
      }, 5000);
    },
  },
});

export const { addTile } = tilesSlice.actions;
export default tilesSlice;
