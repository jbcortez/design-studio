// When elements are changed in the design studio, this hook updates ctaList with those changes.

import { useLayoutEffect, useRef, useState } from "react";
import { setCanvasList } from "../redux/canvasSlice";
import useElements from "./useElements";
import useGetCanvasList from "./useGetCanvasList";
import useGetCurrentCanvasId from "./useGetCurrentCanvasId";
import { useAppDispatch } from "../redux/reduxHooks";
import { CanvasList, Elements, ResponsiveStyles } from "../types";
import { ensure } from "../util/functions";

const useUpdateCanvasList = () => {
  const elements = useElements().present;
  const canvasId = useGetCurrentCanvasId();
  const canvasList = useGetCanvasList();
  const dispatch = useAppDispatch();

  const [canvasListContainer, setCanvasListContainer] = useState<CanvasList>(
    []
  );
  const canvasListRef = useRef<CanvasList>(canvasList);

  useLayoutEffect(() => {
    canvasListRef.current = JSON.parse(JSON.stringify(canvasList));
  }, [canvasList]);

  useLayoutEffect(() => {
    if (elements.length > 0 && canvasListRef.current.length > 0 && canvasId) {
      let currentCanvas = ensure(
        canvasListRef.current.find((item) => item.id === canvasId)
      );

      const elementsArray: Elements = [];

      elements.forEach((el) => {
        if (el.type !== "canvas") {
          elementsArray.push(el);
        } else {
          if (el.title) currentCanvas.title = el.title;

          currentCanvas.style = el.style as ResponsiveStyles;

          if (el.backgroundImg) {
            currentCanvas.backgroundImg = el.backgroundImg;
          } else {
            currentCanvas.backgroundImg = {
              desktop: {
                src: "",
                top: 0,
                left: 0,
              },
              mobile: { src: "", top: 0, left: 0 },
            };
          }
        }
      });

      currentCanvas.elements = elements.filter((el) => el.type !== "canvas");

      setCanvasListContainer([
        currentCanvas,
        ...canvasListRef.current.filter((item) => item.id !== canvasId),
      ]);
    }
  }, [elements, canvasId]);

  useLayoutEffect(() => {
    if (canvasListContainer.length > 0) {
      const timer = setTimeout(() => {
        dispatch(setCanvasList({ canvasList: canvasListContainer }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, canvasListContainer]);
};

export default useUpdateCanvasList;
