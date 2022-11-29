import { useEffect } from "react";
import { useAppDispatch } from "../redux/reduxHooks";
import { setCurrentCanvasId } from "../redux/canvasSlice";
import useQuery from "./useQuery";

const useSetCurrentCanvasId = () => {
  const dispatch = useAppDispatch();
  const query = useQuery();
  let canvasId = query.get("content-id");

  useEffect(() => {
    if (canvasId) dispatch(setCurrentCanvasId({ id: canvasId }));
  }, [dispatch, canvasId]);
};

export default useSetCurrentCanvasId;
