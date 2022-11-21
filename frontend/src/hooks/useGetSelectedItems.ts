import { useAppSelector } from '../redux/reduxHooks';

const useGetSelectedItems = () => {
  return useAppSelector((state) => state.drag.selected);
};

export default useGetSelectedItems;
