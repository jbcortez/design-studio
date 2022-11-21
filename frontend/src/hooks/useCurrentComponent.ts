import { useAppSelector } from '../redux/reduxHooks';

const useCurrentComponent = () => {
  return useAppSelector((state) => state.currentComponent.value);
};

export default useCurrentComponent;
