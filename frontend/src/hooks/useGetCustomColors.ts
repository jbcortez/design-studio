import { useAppSelector } from "../redux/reduxHooks";

const useGetCustomColors = () => {
  return useAppSelector((state) => state.theme.colors.custom);
};

export default useGetCustomColors;
