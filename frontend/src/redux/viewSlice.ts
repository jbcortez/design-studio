import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const viewSlice = createSlice({
  name: 'viewSlice',
  initialState: {
    value: {
      view: '',
      ctaId: '',
    },
  },
  reducers: {
    setView: (
      state,
      action: PayloadAction<{ view: string; ctaId?: string }>
    ) => {
      if (action.payload.view) state.value.view = action.payload.view;
      if (action.payload.ctaId) state.value.ctaId = action.payload.ctaId;
    },
    resetView: (state) => {
      state.value = {
        view: '',
        ctaId: '',
      };
    },
  },
});

export const { setView, resetView } = viewSlice.actions;

export default viewSlice.reducer;
