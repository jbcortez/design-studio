import { useAppSelector } from '../redux/reduxHooks';

const useGuidelines = () => {
  const horizontal = useAppSelector(
    (state) => state.guidelines.showHorizontalCenterLine
  );
  const vertical = useAppSelector(
    (state) => state.guidelines.showVerticalCenterLine
  );

  return [horizontal, vertical];
};

export default useGuidelines;
