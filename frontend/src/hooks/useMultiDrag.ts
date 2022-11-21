/*
Allows user to drag multiple elements in unison. 
Pos is passed to Draggable in each element.
*/

import React, { useEffect } from 'react';
import { Delta, ElementIds, Pos, Style, TargetStartPos } from '../types';

const useMultiDrag = (
  selected: ElementIds,
  id: string,
  targetStartPos: TargetStartPos,
  style: Style,
  delta: Delta,
  setPos: React.Dispatch<React.SetStateAction<Pos>>
) => {
  useEffect(() => {
    if (
      selected.length > 1 &&
      targetStartPos.id &&
      selected.some((elID) => elID === id && elID !== targetStartPos.id) &&
      style.top?.value &&
      style.left?.value
    ) {
      setPos({
        x: style.left.value + delta.x,
        y: style.top.value + delta.y,
      });
    }
  }, [
    delta,
    selected,
    id,
    style.left?.value,
    style.top?.value,
    targetStartPos.id,
    setPos,
  ]);
};

export default useMultiDrag;
