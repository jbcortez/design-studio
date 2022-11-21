import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ElementIds, Pos, TargetStartPos } from '../types';

interface DragState {
  selected: ElementIds;
  targetStartPos: TargetStartPos;
}

const initialState: DragState = {
  selected: [],
  targetStartPos: {
    x: 0,
    y: 0,
    id: null,
  },
};

export const dragSlice = createSlice({
  name: 'dragSlice',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<{ selected: ElementIds }>) => {
      state.selected = [...action.payload.selected];
    },

    clearSelectedItems: (state) => {
      state.selected = [];
    },
    setTargetStartPos: (
      state,
      action: PayloadAction<{ id: string; pos: Pos }>
    ) => {
      const { id, pos } = action.payload;
      const { x, y } = pos;
      state.targetStartPos.x = x;
      state.targetStartPos.y = y;
      state.targetStartPos.id = id;
    },
  },
});

export const { setSelected, clearSelectedItems, setTargetStartPos } =
  dragSlice.actions;

export default dragSlice.reducer;
