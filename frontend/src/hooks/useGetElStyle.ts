import { useEffect, useState } from 'react';
import useGetEditingMode from './useGetEditingMode';
import useTargetElement from './useTargetElement';
import { Style } from '../types';

const useGetElStyle = () => {
  const [elStyle, setElStyle] = useState<Style | null>(null);

  const target = useTargetElement();
  const editingMode = useGetEditingMode();

  useEffect(() => {
    if (target) {
      switch (editingMode) {
        case 'desktop':
          setElStyle(target.style.desktop);
          break;

        case 'mobile':
          setElStyle(target.style.mobile);
          break;
        default:
          return;
      }
    }
  }, [target, editingMode]);
  return elStyle;
};

export default useGetElStyle;
