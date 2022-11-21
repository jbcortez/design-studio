import { useAppSelector } from "../redux/reduxHooks";

const useGetTheme = () => {
  return useAppSelector((state) => state.theme.colors);
};

export default useGetTheme;
