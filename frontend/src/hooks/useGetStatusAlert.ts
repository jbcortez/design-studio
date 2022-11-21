import { useAppSelector } from "../redux/reduxHooks";

const useGetStatusAlert = () => {
  return useAppSelector((state) => state.content.status);
};

export default useGetStatusAlert;
