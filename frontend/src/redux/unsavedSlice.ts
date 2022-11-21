import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const unsavedSlice = createSlice({
  name: 'unsavedSlice',
  initialState: {
    value: false,
  },
  reducers: {
    setUnsaved: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setUnsaved } = unsavedSlice.actions;

export default unsavedSlice.reducer;
