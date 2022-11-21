// Calculates and returns centerOffsetX and centerOffsetY for all elements in the selected array
// Passed to dispatch(setPosition) in MasterElement.tsx

import { useEffect, useState } from 'react';
import { Element } from '../types';

import useElements from './useElements';
import useGetEditingMode from './useGetEditingMode';
import useGetSelectedItems from './useGetSelectedItems';

import useGuidelines from './useGuidelines';

const useSnapToCenter = (
  centerX: number, // center of element being dragged x-axis
  centerY: number, // center of element being dragged y-axis
  elOffsetX: number | null, // offset of element being dragged to left-most element x-axis
  elOffsetY: number | null, // offset of element being dragged to top-most element y-axis
  groupCenterX: number | null, // center of group of elements x-axis
  groupCenterY: number | null // center of group of elements y-axis
) => {
  const [isCenteredY, isCenteredX] = useGuidelines();
  const [centerOfCtaX, setCenterOfCtaX] = useState<number>(0); // center of cta x-axis
  const [centerOfCtaY, setCenterOfCtaY] = useState<number>(0); // center of cta y-axis
  const [centerOffsetX, setCenterOffsetX] = useState<number>(0); // Distance in px from center of cta to center of element on x-axis
  const [centerOffsetY, setCenterOffsetY] = useState<number>(0); // Distance in px from center of cta to center of element on y-axis
  const [cta, setCta] = useState<Element | null>(null);

  const elements = useElements().present;
  const selected = useGetSelectedItems();

  // TODO editing mode
  const editingMode = useGetEditingMode();

  // Set cta in state from elements array
  useEffect(() => {
    if (elements.length > 0) {
      const ctaElement = elements.find((element) => element.type === 'cta');
      if (ctaElement) {
        setCta(ctaElement);
      }
    }
  }, [elements]);

  // Set center of CTA
  useEffect(() => {
    switch (editingMode) {
      case 'desktop':
        if (typeof cta?.style.desktop.width?.value === 'number') {
          setCenterOfCtaX(cta.style.desktop.width.value / 2);
        }
        if (typeof cta?.style.desktop.height?.value === 'number') {
          setCenterOfCtaY(cta.style.desktop.height.value / 2);
        }
        break;

      case 'mobile':
        if (typeof cta?.style.mobile.width?.value === 'number') {
          setCenterOfCtaX(cta.style.mobile.width.value / 2);
        }
        if (typeof cta?.style.mobile.height?.value === 'number') {
          setCenterOfCtaY(cta.style.mobile.height.value / 2);
        }
        break;
      default:
        break;
    }
  }, [cta, editingMode]);

  // Calculate and set horizontal center offset of element
  useEffect(() => {
    if (selected.length === 1) {
      if (isCenteredX && centerX !== 0 && centerOfCtaX !== 0) {
        setCenterOffsetX(Math.round(centerOfCtaX - centerX));
      } else {
        setCenterOffsetX(0);
      }
    } else if (selected.length > 1) {
      if (
        isCenteredX &&
        typeof groupCenterX === 'number' &&
        centerOfCtaX !== 0 &&
        elOffsetX !== null
      ) {
        setCenterOffsetX(Math.round(centerOfCtaX - groupCenterX + elOffsetX));
      } else {
        setCenterOffsetX(0);
      }
    }
  }, [isCenteredX, centerOfCtaX, groupCenterX, selected, centerX, elOffsetX]);

  // Calculate and set vertical center offset of element
  useEffect(() => {
    if (selected.length === 1) {
      if (isCenteredY && centerY !== 0 && centerOfCtaY !== 0) {
        setCenterOffsetY(Math.round(centerOfCtaY - centerY));
      } else {
        setCenterOffsetY(0);
      }
    } else if (selected.length > 1) {
      if (
        isCenteredY &&
        typeof groupCenterY === 'number' &&
        centerOfCtaY !== 0 &&
        elOffsetY !== null
      ) {
        setCenterOffsetY(Math.round(centerOfCtaY - groupCenterY + elOffsetY));
      } else {
        setCenterOffsetY(0);
      }
    }
  }, [isCenteredY, centerOfCtaY, centerY, selected, groupCenterY, elOffsetY]);

  return [centerOffsetX, centerOffsetY];
};

export default useSnapToCenter;
