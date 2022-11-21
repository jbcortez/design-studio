import { useAppSelector } from '../redux/reduxHooks';

const useShowSidebar = () => {
  return useAppSelector((state) => state.sidebarView.showSidebar);
};

export default useShowSidebar;
