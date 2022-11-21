import { useAppSelector } from "../redux/reduxHooks";
import { Content } from "../types";

const useGetCurrentContent = (): Content | null => {
  return useAppSelector((state) => state.content.currentContent);
};

export default useGetCurrentContent;
