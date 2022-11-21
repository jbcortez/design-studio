import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: boolean;
}

const initialState: InitialState = { value: true };

export const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.value = action.payload.loading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
