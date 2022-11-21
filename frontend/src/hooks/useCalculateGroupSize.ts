/*
  Calculates all four corners of selected elements. Used to position the group when snapping to center.
*/

import { useEffect, useState } from "react";
import useElements from "./useElements";
import useGetEditingMode from "./useGetEditingMode";
import useGetSelectedItems from "./useGetSelectedItems";

const useCalculateGroupSize = () => {
  const [groupTop, setGroupTop] = useState<number | null>(null);
  const [groupBottom, setGroupBottom] = useState<number | null>(null);
  const [groupLeft, setGroupLeft] = useState<number | null>(null);
  const [groupRight, setGroupRight] = useState<number | null>(null);
  const selected = useGetSelectedItems();
  const elements = useElements().present;
  const editingMode = useGetEditingMode();

  // If selected items are more than 1, get the height and width of the overall group
  useEffect(() => {
    if (selected.length > 1) {
      // The smallest top value will be the top of the group
      let topMin = 999999999;
      let isCompleted = false;
      selected.forEach((id, i) => {
        const element = elements.find((element) => element.id === id);

        switch (editingMode) {
          case "desktop":
            if (typeof element?.style.desktop.top?.value !== "undefined") {
              topMin = Math.min(topMin, element.style.desktop.top.value);
            }
            break;
          case "mobile":
            if (typeof element?.style.mobile.top?.value !== "undefined") {
              topMin = Math.min(topMin, element.style.mobile.top.value);
            }
            break;
          default:
            break;
        }

        if (i === selected.length - 1) {
          isCompleted = true;
        }
      });

      if (isCompleted) {
        setGroupTop(Math.round(topMin));
      }
    }
  }, [selected, elements, editingMode]);

  useEffect(() => {
    if (selected.length > 1) {
      // The largest top value + height of that element will be the bottom of the group

      let bottomMax = 0;
      let isCompleted = false;
      selected.forEach((id, i) => {
        const element = elements.find((element) => element.id === id);

        switch (editingMode) {
          case "desktop":
            if (
              typeof element?.style.desktop.top?.value === "number" &&
              typeof element?.style.desktop.height?.value === "number"
            ) {
              bottomMax = Math.max(
                bottomMax,
                element.style.desktop.top.value +
                  element.style.desktop.height.value
              );
            }
            break;
          case "mobile":
            if (
              typeof element?.style.mobile.top?.value === "number" &&
              typeof element?.style.mobile.height?.value === "number"
            ) {
              bottomMax = Math.max(
                bottomMax,
                element.style.mobile.top.value +
                  element.style.mobile.height.value
              );
            }
            break;
          default:
            break;
        }

        if (i === selected.length - 1) {
          isCompleted = true;
        }
      });

      if (isCompleted) {
        setGroupBottom(Math.round(bottomMax));
      }
    }
  }, [selected, elements, editingMode]);

  useEffect(() => {
    if (selected.length > 1) {
      // The smallest left value will be the left of the group

      let leftMin = 999999999;
      let isCompleted = false;
      selected.forEach((id, i) => {
        const element = elements.find((element) => element.id === id);

        switch (editingMode) {
          case "desktop":
            if (typeof element?.style.desktop.left?.value !== "undefined") {
              leftMin = Math.min(leftMin, element.style.desktop.left.value);
            }
            break;
          case "mobile":
            if (typeof element?.style.mobile.left?.value !== "undefined") {
              leftMin = Math.min(leftMin, element.style.mobile.left.value);
            }
            break;
          default:
            break;
        }

        if (i === selected.length - 1) {
          isCompleted = true;
        }
      });

      if (isCompleted) {
        setGroupLeft(Math.round(leftMin));
      }
    }
  }, [selected, elements, editingMode]);

  useEffect(() => {
    if (selected.length > 1) {
      // If the largest left value + width is greater than any elements left value + it's width, that value will be the right of the group

      let widthPlusLeftMax = 0;
      let isCompleted = false;
      selected.forEach((id, i) => {
        const element = elements.find((element) => element.id === id);

        switch (editingMode) {
          case "desktop":
            if (
              typeof element?.style.desktop.left?.value === "number" &&
              typeof element?.style.desktop.width?.value === "number"
            ) {
              widthPlusLeftMax = Math.max(
                widthPlusLeftMax,
                element.style.desktop.left.value +
                  element.style.desktop.width.value
              );
            }
            break;
          case "mobile":
            if (
              typeof element?.style.mobile.left?.value === "number" &&
              typeof element?.style.mobile.width?.value === "number"
            ) {
              widthPlusLeftMax = Math.max(
                widthPlusLeftMax,
                element.style.mobile.left.value +
                  element.style.mobile.width.value
              );
            }
            break;
          default:
            break;
        }

        if (i === selected.length - 1) {
          isCompleted = true;
        }
      });

      if (isCompleted) {
        setGroupRight(widthPlusLeftMax);
      }
    }
  }, [selected, elements, editingMode]);

  return [groupTop, groupRight, groupBottom, groupLeft];
};

export default useCalculateGroupSize;
