import { useAppSelector } from '../redux/reduxHooks';

const useSidebarView = () => {
  return useAppSelector((state) => state.sidebarView.id);
};

export default useSidebarView;
