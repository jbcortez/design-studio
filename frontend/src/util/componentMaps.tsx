import React from "react";
import MasterElement from "../components/DesignStudio/MasterElement";
import {
  Delta,
  Element,
  ElementIds,
  Pos,
  Rect,
  SVGVariation,
  TargetStartPos,
} from "../types";

export const elementMap = (
  el: Element,
  editingMode: string,
  addSelected: React.MouseEventHandler,
  handleMouseDown: React.MouseEventHandler,
  selected: ElementIds,
  setTarget: React.Dispatch<
    React.SetStateAction<{
      x: 0;
      y: 0;
      id: null;
    }>
  >,
  startEvent: (e: any, data: any) => void,
  targetStartPos: TargetStartPos,
  delta: Delta,
  rect: Rect,
  ctaRef: React.ForwardedRef<HTMLDivElement>,
  setDelta: (value: Pos | ((prevVar: Pos) => Pos)) => void,
  variation?: SVGVariation,
  title?: string | undefined
) => {
  let elStyle;

  switch (editingMode) {
    case "desktop":
      elStyle = el.style.desktop;
      break;

    case "mobile":
      elStyle = el.style.mobile;
      break;
    default:
      break;
  }

  return (
    <MasterElement
      type={el.type !== "canvas" ? el.type : null}
      content={el.content}
      style={elStyle}
      key={el.id}
      id={el.id}
      onClick={addSelected}
      variation={variation}
      onMouseDown={handleMouseDown}
      selected={selected}
      setTarget={setTarget}
      startEvent={startEvent}
      targetStartPos={targetStartPos}
      delta={delta}
      rect={rect}
      ctaRef={ctaRef}
      src={el.src}
      alt={el.alt}
      setDelta={setDelta}
      link={el.link}
    />
  );
};
