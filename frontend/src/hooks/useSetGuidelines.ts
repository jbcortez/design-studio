// Shows or hides center guidelines.

import { useEffect, useState } from "react";
import { CurrentComponent, Element } from "../types";
import { showHorizCenter, showVertCenter } from "../redux/guidelineSlice";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import useElements from "./useElements";
import useGetEditingMode from "./useGetEditingMode";
import useGetSelectedItems from "./useGetSelectedItems";

const useSetGuidelines = (
  center: { x: number; y: number }, // center of element being dragged
  groupOffsetX: number, // offset of center of element to center of group on x-axis
  groupOffsetY: number, // offset of center of element to center of group on y-axis
  elOffsetX: number | null, // offset of element to left-most element
  elOffsetY: number | null, // offset of element to top-most element
  currentComponent: CurrentComponent,
  id: string
) => {
  const dispatch = useAppDispatch();
  // Trigger when center of element is within +/- 1px of center of cta
  const showVerticalGuideline = useAppSelector(
    (state) => state.guidelines.showVerticalCenterLine
  );
  const showHorizontalGuideline = useAppSelector(
    (state) => state.guidelines.showHorizontalCenterLine
  );
  const elements = useElements().present;
  const selected = useGetSelectedItems();
  const OFFSET = 10;
  const [cta, setCta] = useState<Element | null>(null);
  const [centerOfCtaX, setCenterOfCtaX] = useState<number>(0); // center of cta x-axis
  const [centerOfCtaY, setCenterOfCtaY] = useState<number>(0); // center of cta y-axis
  const editingMode = useGetEditingMode();

  // Get CTA element from elements array
  useEffect(() => {
    if (elements.length > 0) {
      const ctaElement = elements.find((element) => element.type === "cta");
      if (ctaElement) {
        setCta(ctaElement);
      }
    }
  }, [elements]);

  // Set center of CTA
  useEffect(() => {
    switch (editingMode) {
      case "desktop":
        if (typeof cta?.style.desktop.width?.value === "number") {
          setCenterOfCtaX(cta.style.desktop.width.value / 2);
        }
        if (typeof cta?.style.desktop.height?.value === "number") {
          setCenterOfCtaY(cta.style.desktop.height.value / 2);
        }
        break;

      case "mobile":
        if (typeof cta?.style.mobile.width?.value === "number") {
          setCenterOfCtaX(cta.style.mobile.width.value / 2);
        }
        if (typeof cta?.style.mobile.height?.value === "number") {
          setCenterOfCtaY(cta.style.mobile.height.value / 2);
        }
        break;
      default:
        break;
    }
  }, [cta, editingMode]);

  // If center of element or group of elements on x-axis is within OFFSET pixels of center of cta, show vertical guideline

  useEffect(() => {
    if (selected.length === 1) {
      if (
        Math.abs(centerOfCtaX - center.x) <= OFFSET &&
        currentComponent.id === id &&
        currentComponent.type !== "cta"
      ) {
        dispatch(showVertCenter({ show: true }));
      } else if (showVerticalGuideline) {
        dispatch(showVertCenter({ show: false }));
      }
    } else if (selected.length > 1) {
      if (elOffsetX !== null) {
        if (
          Math.abs(centerOfCtaX - (center.x + groupOffsetX - elOffsetX)) <=
          OFFSET
        ) {
          dispatch(showVertCenter({ show: true }));
        } else if (showVerticalGuideline) {
          dispatch(showVertCenter({ show: false }));
        }
      }
    }
    // eslint-disable-next-line
  }, [
    center.x,
    centerOfCtaX,
    dispatch,
    currentComponent,
    id,
    selected,
    groupOffsetX,
    elOffsetX,
  ]);

  // If center of element or group of elements on y-axis is within OFFSET pixels of center of cta, show horizontal guideline

  useEffect(() => {
    if (selected.length === 1) {
      if (
        Math.abs(centerOfCtaY - center.y) <= OFFSET &&
        currentComponent.id === id &&
        currentComponent.type !== "cta"
      ) {
        dispatch(showHorizCenter({ show: true }));
      } else if (showHorizontalGuideline) {
        dispatch(showHorizCenter({ show: false }));
      }
    } else if (selected.length > 1) {
      if (elOffsetY !== null) {
        if (
          Math.abs(centerOfCtaY - (center.y + groupOffsetY - elOffsetY)) <=
          OFFSET
        ) {
          dispatch(showHorizCenter({ show: true }));
        } else if (showHorizontalGuideline) {
          dispatch(showHorizCenter({ show: false }));
        }
      }
    }
    // eslint-disable-next-line
  }, [
    center.y,
    centerOfCtaY,
    groupOffsetY,
    dispatch,
    currentComponent,
    id,
    selected,
    elOffsetY,
  ]);
};
export default useSetGuidelines;
