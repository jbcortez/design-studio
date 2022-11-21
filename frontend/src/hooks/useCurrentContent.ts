import { useAppSelector } from "../redux/reduxHooks";

const useCurrentContent = () => {
  return useAppSelector((state) => state.content.currentContent);
};

export default useCurrentContent;
