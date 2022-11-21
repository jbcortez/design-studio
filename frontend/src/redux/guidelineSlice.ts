import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GuidelineState {
  showVerticalCenterLine: boolean;
  showHorizontalCenterLine: boolean;
}

const initialState: GuidelineState = {
  showVerticalCenterLine: false,
  showHorizontalCenterLine: false,
};

export const guidelineSlice = createSlice({
  name: 'guidelineSlice',
  initialState,
  reducers: {
    showVertCenter: (state, action: PayloadAction<{ show: boolean }>) => {
      state.showVerticalCenterLine = action.payload.show;
    },

    showHorizCenter: (state, action: PayloadAction<{ show: boolean }>) => {
      state.showHorizontalCenterLine = action.payload.show;
    },
  },
});

export const { showVertCenter, showHorizCenter } = guidelineSlice.actions;

export default guidelineSlice.reducer;
