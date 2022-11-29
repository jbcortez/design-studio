import { useAppSelector } from "../redux/reduxHooks";

const useGetCurrentCanvasId = (): string => {
  return useAppSelector((state) => state.canvas.currentCanvasId);
};

export default useGetCurrentCanvasId;
