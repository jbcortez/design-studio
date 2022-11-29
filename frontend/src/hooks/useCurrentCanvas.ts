import { useAppSelector } from "../redux/reduxHooks";

const useCurrentCanvas = () => {
  return useAppSelector((state) => state.canvas.currentCanvas);
};

export default useCurrentCanvas;
