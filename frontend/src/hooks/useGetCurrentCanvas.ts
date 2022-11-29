import { useAppSelector } from "../redux/reduxHooks";
import { Canvas } from "../types";

const useGetCurrentCanvas = (): Canvas | null => {
  return useAppSelector((state) => state.canvas.currentCanvas);
};

export default useGetCurrentCanvas;
