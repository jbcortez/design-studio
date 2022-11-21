// Append a stylesheet to head for each unique font family

import { useEffect, useState } from "react";
import { Content } from "../types";
import { queryActiveFontLinks } from "../util/functions";
import { setLoading } from "../redux/loadingSlice";
import { useAppDispatch } from "../redux/reduxHooks";

const useAppendFontScripts = (currentContent: Content | null) => {
  const [fontFamilies, setFontFamilies] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  // Store all unique font families in state
  useEffect(() => {
    if (currentContent && Object.keys(currentContent).length > 0) {
      setFontFamilies(
        currentContent.elements
          .map((el) => el.style.desktop.fontFamily?.value)
          .reduce((acc: string[], font: string) => {
            if (font && !acc.includes(font)) {
              acc.push(font);
            }
            return acc;
          }, [] as string[])
      );
    }
  }, [currentContent]);

  // Load stylesheet for each font family
  useEffect(() => {
    if (fontFamilies.length > 0) {
      dispatch(setLoading({ loading: true }));
      fontFamilies.forEach((font, index) => {
        // Get active font links
        const activeLinks = queryActiveFontLinks();

        // Check if a link already exists for this font. If it doesn't, create and append link.
        if (!activeLinks.includes(font)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.dataset.type = "active-font";
          link.dataset.family = font;
          link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;
          link.crossOrigin = "anonymous";
          document.head.appendChild(link);
        }

        if (index === fontFamilies.length - 1) {
          dispatch(setLoading({ loading: false }));
        }
      });
    } else {
      dispatch(setLoading({ loading: false }));
    }
  }, [fontFamilies, dispatch]);
};
export default useAppendFontScripts;
