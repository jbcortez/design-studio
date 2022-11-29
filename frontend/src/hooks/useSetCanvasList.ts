import { useEffect, useRef } from "react";
import { setCanvasList } from "../redux/canvasSlice";
import { getAllCanvas } from "../util/services/canvasServices";
import { useAppDispatch } from "../redux/reduxHooks";

const useSetCanvasList = () => {
  const dispatch = useAppDispatch();
  const hasRendered = useRef<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    getAllCanvas(controller).then((res) => {
      if (res?.length) {
        dispatch(setCanvasList({ canvasList: res }));
        hasRendered.current = true;
      }
    });

    return () => controller.abort();
  }, [dispatch]);

  return hasRendered.current;
};

export default useSetCanvasList;
