// Removes link tags for inactive fonts

import { useEffect, useState } from 'react';
import { queryActiveFontLinks } from '../util/functions';
import useElements from './useElements';

const useRemoveFontScripts = () => {
  const [fontFamilies, setFontFamilies] = useState<string[]>([]);
  const activeFontLinks = queryActiveFontLinks();
  const elements = useElements().present;

  // Every time elements change, store all font families in state
  useEffect(() => {
    setFontFamilies(
      elements
        .map((el) => el.style.desktop.fontFamily?.value)
        .reduce((acc: string[], font: string) => {
          if (font && !acc.includes(font)) {
            acc.push(font);
          }
          return acc;
        }, [] as string[])
    );
  }, [elements]);

  // When fontFamilies is updated, check for unnecessary font scripts
  useEffect(() => {
    if (activeFontLinks.length > 0 && fontFamilies.length > 0) {
      // Map through activeFontLinks. If any of the families in the activeFontLinks do not exist in fontFamilies state, remove link tag.
      activeFontLinks.forEach((link) => {
        if (!fontFamilies.includes(link)) {
          // Remove link tag
          document.querySelector(`[data-family="${link}"]`)?.remove();
        }
      });
    }
  }, [fontFamilies, activeFontLinks]);
};

export default useRemoveFontScripts;
