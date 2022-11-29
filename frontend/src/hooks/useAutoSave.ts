import { useEffect } from "react";
import { setCurrentCanvas } from "../redux/canvasSlice";
import { setUnsaved } from "../redux/unsavedSlice";
import { updateCanvas } from "../util/services/canvasServices";
import useElements from "./useElements";
import useGetCanvasList from "./useGetCanvasList";
import useGetCurrentCanvasId from "./useGetCurrentCanvasId";
import useGetCurrentCanvas from "./useGetCurrentCanvas";
import { useAppDispatch } from "../redux/reduxHooks";

const AUTOSAVE_INTERVAL: number = 500;

const useAutoSave = () => {
  const currentCanvas = useGetCurrentCanvas();
  const canvasId = useGetCurrentCanvasId();
  const elements = useElements().present;
  const dispatch = useAppDispatch();
  const canvasList = useGetCanvasList();

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      if (currentCanvas && Object.keys(currentCanvas).length > 0) {
        updateCanvas(currentCanvas, controller);
      }
      dispatch(setUnsaved(false));
    }, AUTOSAVE_INTERVAL);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [currentCanvas, dispatch]);

  useEffect(() => {
    if (canvasList.length > 0 && canvasId) {
      const currentCanvas = canvasList.find((item) => canvasId === item.id);
      if (currentCanvas) {
        dispatch(setCurrentCanvas({ currentCanvas }));
      }
    } else {
      dispatch(setCurrentCanvas({ currentCanvas: null }));
    }
  }, [canvasList, dispatch, canvasId]);

  useEffect(() => {
    dispatch(setUnsaved(true));
  }, [elements, dispatch]);
};

export default useAutoSave;
