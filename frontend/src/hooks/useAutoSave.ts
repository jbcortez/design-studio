import { useEffect } from "react";
import { setCurrentContent } from "../redux/contentSlice";
import { setUnsaved } from "../redux/unsavedSlice";
import { updateContent } from "../util/services/contentServices";
import useElements from "./useElements";
import useGetContentList from "./useGetContentList";
import useGetCurrentContentId from "./useGetCurrentContentId";
import useGetCurrentContent from "./useGetCurrentContent";
import { useAppDispatch } from "../redux/reduxHooks";

const AUTOSAVE_INTERVAL: number = 500;

const useAutoSave = () => {
  const currentContent = useGetCurrentContent();
  const contentId = useGetCurrentContentId();
  const elements = useElements().present;
  const dispatch = useAppDispatch();
  const contentList = useGetContentList();

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      if (currentContent && Object.keys(currentContent).length > 0) {
        updateContent(currentContent, controller);
      }
      dispatch(setUnsaved(false));
    }, AUTOSAVE_INTERVAL);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [currentContent, dispatch]);

  useEffect(() => {
    if (contentList.length > 0 && contentId) {
      const currentContent = contentList.find((item) => contentId === item.id);
      if (currentContent) {
        dispatch(setCurrentContent({ currentContent }));
      }
    } else {
      dispatch(setCurrentContent({ currentContent: null }));
    }
  }, [contentList, dispatch, contentId]);

  useEffect(() => {
    dispatch(setUnsaved(true));
  }, [elements, dispatch]);
};

export default useAutoSave;
