import { ContentList } from "../types";
import { useAppSelector } from "../redux/reduxHooks";

const useGetContentList = (): ContentList => {
  return useAppSelector((state) => state.content.contentList);
};

export default useGetContentList;
