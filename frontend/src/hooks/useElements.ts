import { useAppSelector } from '../redux/reduxHooks';

const useElements = () => {
  return useAppSelector((state) => state.elements.list);
};

export default useElements;
