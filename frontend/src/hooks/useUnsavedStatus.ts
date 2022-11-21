import { useAppSelector } from '../redux/reduxHooks';

// Returns unsavedStatus from redux store
// unsavedStatus says whether or not there are unsaved changes in the Design Studio
// unsavedStatus === true  // Unsaved changes
// unsavedStatus === false // All changes are saved

const useUnsavedStatus = () => {
  return useAppSelector((state) => state.unsavedStatus.value);
};

export default useUnsavedStatus;
