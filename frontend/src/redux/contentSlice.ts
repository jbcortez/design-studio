import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Content, ContentList } from "../types";

interface CtaState {
  currentContentId: string;
  contentList: ContentList;
  currentContent: Content | null;
  status: {
    message: string | undefined;
    type: "success" | "info" | "warning" | "error" | undefined;
  };
}

const initialState: CtaState = {
  currentContentId: "",
  contentList: [],
  currentContent: {
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

export const contentSlice = createSlice({
  name: "contentSlice",
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

    setCurrentContent: (
      state,
      action: PayloadAction<{ currentContent: Content | null }>
    ) => {
      const { currentContent } = action.payload;

      state.currentContent = currentContent;
    },
    setContentList: (
      state,
      action: PayloadAction<{ contentList: ContentList }>
    ) => {
      state.contentList = action.payload.contentList;
    },
    setCurrentContentId: (state, action: PayloadAction<{ id: string }>) => {
      if (action.payload.id) {
        state.currentContentId = action.payload.id;
      }
    },
  },
});

export const {
  setStatus,

  setContentList,
  setCurrentContent,
  setCurrentContentId,
} = contentSlice.actions;

export default contentSlice.reducer;
