import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { setView } from '../redux/viewSlice';
import useQuery from './useQuery';

const useView = () => {
  const query = useQuery();
  const view = query.get('view');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (view) {
      dispatch(setView({ view }));
    }
  }, [view, dispatch]);

  return useAppSelector((state) => state.view.value);
};

export default useView;
