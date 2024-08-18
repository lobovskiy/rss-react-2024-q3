import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { FormData } from '../../schemas/formSchema.ts';

type StoredFormData = Omit<FormData, 'picture'> & { picture: string };

export interface TilesState {
  addedInLast5SecTile: StoredFormData | null;
  list: StoredFormData[];
}

const initialState: TilesState = {
  addedInLast5SecTile: null,
  list: [],
};

const tilesSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    addTile(state, action: PayloadAction<StoredFormData>) {
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
