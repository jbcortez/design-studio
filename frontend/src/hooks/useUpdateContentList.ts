// When elements are changed in the design studio, this hook updates ctaList with those changes.

import { useLayoutEffect, useRef, useState } from "react";
import { setContentList } from "../redux/contentSlice";
import useElements from "./useElements";
import useGetContentList from "./useGetContentList";
import useGetCurrentContentId from "./useGetCurrentContentId";
import { useAppDispatch } from "../redux/reduxHooks";
import { ContentList, Elements, ResponsiveStyles } from "../types";
import { ensure } from "../util/functions";

const useUpdateContentList = () => {
  const elements = useElements().present;
  const contentId = useGetCurrentContentId();
  const contentList = useGetContentList();
  const dispatch = useAppDispatch();

  const [contentListContainer, setContentListContainer] = useState<ContentList>(
    []
  );
  const contentListRef = useRef<ContentList>(contentList);

  useLayoutEffect(() => {
    contentListRef.current = JSON.parse(JSON.stringify(contentList));
  }, [contentList]);

  useLayoutEffect(() => {
    if (elements.length > 0 && contentListRef.current.length > 0 && contentId) {
      let currentContent = ensure(
        contentListRef.current.find((cta) => cta.id === contentId)
      );

      const elementsArray: Elements = [];

      elements.forEach((el) => {
        if (el.type !== "cta") {
          elementsArray.push(el);
        } else {
          if (el.title) currentContent.title = el.title;

          currentContent.style = el.style as ResponsiveStyles;

          if (el.backgroundImg) {
            currentContent.backgroundImg = el.backgroundImg;
          } else {
            currentContent.backgroundImg = {
              desktop: {
                src: "",
                top: 0,
                left: 0,
              },
              mobile: { src: "", top: 0, left: 0 },
            };
          }
        }
      });

      currentContent.elements = elements.filter((el) => el.type !== "cta");

      setContentListContainer([
        currentContent,
        ...contentListRef.current.filter((item) => item.id !== contentId),
      ]);
    }
  }, [elements, contentId]);

  useLayoutEffect(() => {
    if (contentListContainer.length > 0) {
      const timer = setTimeout(() => {
        dispatch(setContentList({ contentList: contentListContainer }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, contentListContainer]);
};

export default useUpdateContentList;
