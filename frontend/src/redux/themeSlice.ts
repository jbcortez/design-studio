import { Colors, Theme } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  colors: Theme;
  zoom: number;
}

const initialState: ThemeState = {
  colors: {
    theme: [
      { value: "#FFFFFF", id: "color-1" },
      { value: "#E8E6E6", id: "color-2" },
      { value: "#C7C7C7", id: "color-3" },
      { value: "#757575", id: "color-4" },
      { value: "#000000", id: "color-5" },
      { value: "#4A9183", id: "color-6" },
      { value: "#35685E", id: "color-7" },
      { value: "#014235", id: "color-8" },
      { value: "#1D2927", id: "color-9" },
      { value: "#000000", id: "color-10" },
      { value: "#DCE3F5", id: "color-11" },
      { value: "#C0CBED", id: "color-12" },
      { value: "#97ADED", id: "color-13" },
      { value: "#4B5676", id: "color-14" },
      { value: "#262B3B", id: "color-15" },
      { value: "#E1C1BC", id: "color-16" },
      { value: "#C29992", id: "color-17" },
      { value: "#A45F53", id: "color-18" },
      { value: "#6D3F37", id: "color-19" },
      { value: "#37201C", id: "color-20" },
      { value: "#FFFDF7", id: "color-21" },
      { value: "#FAF5EB", id: "color-22" },
      { value: "#F4EBD7", id: "color-23" },
      { value: "#C3BCAC", id: "color-24" },
      { value: "#7A766C", id: "color-25" },
    ],
    custom: [{ id: "12345", value: "#FFFF" }],
  },
  zoom: 1,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<{ theme: Theme }>) => {
      if (action.payload.theme) {
        state.colors = action.payload.theme;
      }
    },
    setCustomColors: (
      state,
      action: PayloadAction<{ customColors: Colors }>
    ) => {
      state.colors.custom = [...action.payload.customColors];
    },
    setZoom: (state, action: PayloadAction<{ zoom: number }>) => {
      const { zoom } = action.payload;
      let zoomValue = zoom;
      if (zoomValue > 1) zoomValue = 1;
      state.zoom = zoomValue;
    },
  },
});

export const { setTheme, setCustomColors, setZoom } = themeSlice.actions;

export default themeSlice.reducer;
