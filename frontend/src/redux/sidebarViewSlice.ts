import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  id: number;
  showSidebar: boolean;
}

const initialState: InitialState = {
  id: 1,
  showSidebar: true,
};

export const sidebarViewSlice = createSlice({
  name: "sidebarViewSlice",
  initialState,
  reducers: {
    setActiveSidebarView: (
      state,
      action: PayloadAction<{ id: string | number }>
    ) => {
      const { id } = action.payload;

      if (typeof id === "string") {
        state.id = parseInt(id);
      } else {
        state.id = id;
      }
    },
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setActiveSidebarView, setShowSidebar } =
  sidebarViewSlice.actions;

export default sidebarViewSlice.reducer;
