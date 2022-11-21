import { useAppSelector } from "../redux/reduxHooks";

const useGetCurrentContentId = (): string => {
  return useAppSelector((state) => state.content.currentContentId);
};

export default useGetCurrentContentId;
