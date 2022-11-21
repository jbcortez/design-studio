import { useAppSelector } from "../redux/reduxHooks";

const useGetEditingMode = (): "desktop" | "mobile" => {
  return useAppSelector((state) => state.elements.editingMode);
};

export default useGetEditingMode;
