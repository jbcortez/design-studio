import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Canvas, CanvasList } from "../types";

interface CanvasState {
  currentCanvasId: string;
  canvasList: CanvasList;
  currentCanvas: Canvas | null;
  status: {
    message: string | undefined;
    type: "success" | "info" | "warning" | "error" | undefined;
  };
}

const initialState: CanvasState = {
  currentCanvasId: "",
  canvasList: [],
  currentCanvas: {
    id: "",
    title: "",
    elements: [],
    style: {
      desktop: {},

      mobile: {},
    },
    backgroundImg: {
      desktop: {
        src: "",
        top: 0,
        left: 0,
      },
      mobile: {
        src: "",
        top: 0,
        left: 0,
      },
    },
    createdAt: 0,
    updatedAt: 0,
  },
  status: { message: undefined, type: undefined },
};

export const canvasSlice = createSlice({
  name: "canvasSlice",
  initialState,
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<{
        message: string | undefined;
        type: "success" | "info" | "warning" | "error" | undefined;
      }>
    ) => {
      state.status.message = action.payload.message;
      state.status.type = action.payload.type;
    },

    setCurrentCanvas: (
      state,
      action: PayloadAction<{ currentCanvas: Canvas | null }>
    ) => {
      const { currentCanvas } = action.payload;

      state.currentCanvas = currentCanvas;
    },
    setCanvasList: (
      state,
      action: PayloadAction<{ canvasList: CanvasList }>
    ) => {
      state.canvasList = action.payload.canvasList;
    },
    setCurrentCanvasId: (state, action: PayloadAction<{ id: string }>) => {
      if (action.payload.id) {
        state.currentCanvasId = action.payload.id;
      }
    },
  },
});

export const {
  setStatus,

  setCanvasList,
  setCurrentCanvas,
  setCurrentCanvasId,
} = canvasSlice.actions;

export default canvasSlice.reducer;
