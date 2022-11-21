import { useAppSelector } from '../redux/reduxHooks';

const useLoading = () => {
  return useAppSelector((state) => state.loading.value);
};

export default useLoading;
