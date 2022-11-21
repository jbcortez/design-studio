import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/reduxHooks';
import { resetCurrentComponent } from '../redux/currentComponentSlice';
import useComponents from './useElements';
import useCurrentComponent from './useCurrentComponent';
import { Element } from '../types';

const useTargetElement = () => {
  const componentList = useComponents().present;
  const currentComponent = useCurrentComponent();

  const dispatch = useAppDispatch();

  const [target, setTarget] = useState<Element | undefined>(
    componentList.find((el) => el.id === currentComponent.id)
  );

  useEffect(() => {
    setTarget(componentList.find((el) => el.id === currentComponent.id));
  }, [componentList, currentComponent]);

  useEffect(() => {
    if (!target) {
      dispatch(resetCurrentComponent());
    }
  }, [target, dispatch]);

  return target;
};

export default useTargetElement;
