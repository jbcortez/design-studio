import { configureStore } from "@reduxjs/toolkit";
import sidebarViewReducer from "./sidebarViewSlice";
import currentComponentReducer from "./currentComponentSlice";
import elementReducer from "./elementSlice";
import unsavedStatusReducer from "./unsavedSlice";
import contentReducer from "./contentSlice";
import dragReducer from "./dragSlice";
import viewReducer from "./viewSlice";
import themeReducer from "./themeSlice";
import loadingReducer from "./loadingSlice";
import guidelineReducer from "./guidelineSlice";

const store = configureStore({
  reducer: {
    sidebarView: sidebarViewReducer,
    currentComponent: currentComponentReducer,
    elements: elementReducer,
    unsavedStatus: unsavedStatusReducer,
    content: contentReducer,
    drag: dragReducer,
    view: viewReducer,
    theme: themeReducer,
    loading: loadingReducer,
    guidelines: guidelineReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
