import { CanvasList } from "../types";
import { useAppSelector } from "../redux/reduxHooks";

const useGetCanvasList = (): CanvasList => {
  return useAppSelector((state) => state.canvas.canvasList);
};

export default useGetCanvasList;
