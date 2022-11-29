import { useAppSelector } from "../redux/reduxHooks";

const useGetStatusAlert = () => {
  return useAppSelector((state) => state.canvas.status);
};

export default useGetStatusAlert;
