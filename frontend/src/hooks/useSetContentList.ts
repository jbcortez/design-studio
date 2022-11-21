import { useEffect, useRef } from "react";
import { setContentList } from "../redux/contentSlice";
import { getAllContent } from "../util/services/contentServices";
import { useAppDispatch } from "../redux/reduxHooks";

const useSetContentList = () => {
  const dispatch = useAppDispatch();
  const hasRendered = useRef<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    getAllContent(controller).then((res) => {
      if (res) {
        dispatch(setContentList({ contentList: res }));
        hasRendered.current = true;
      }
    });

    return () => controller.abort();
  }, [dispatch]);

  return hasRendered.current;
};

export default useSetContentList;
