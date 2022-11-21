// Identifies the component that is currently being edited

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentComponent } from '../types';

interface State {
  value: CurrentComponent;
}

const initialState: State = {
  value: { id: null, type: null },
};

export const currentComponentSlice = createSlice({
  name: 'currentComponentSlice',
  initialState,
  reducers: {
    setCurrentComponent: (state, action: PayloadAction<CurrentComponent>) => {
      state.value = action.payload;
    },
    resetCurrentComponent: (state) => {
      state.value = { id: null, type: null };
    },
  },
});

export const { setCurrentComponent, resetCurrentComponent } =
  currentComponentSlice.actions;

export default currentComponentSlice.reducer;
