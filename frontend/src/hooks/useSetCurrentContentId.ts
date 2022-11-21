import { useEffect } from "react";
import { useAppDispatch } from "../redux/reduxHooks";
import { setCurrentContentId } from "../redux/contentSlice";
import useQuery from "./useQuery";

const useSetCurrentContentId = () => {
  const dispatch = useAppDispatch();
  const query = useQuery();
  let contentId = query.get("content-id");

  useEffect(() => {
    if (contentId) dispatch(setCurrentContentId({ id: contentId }));
  }, [dispatch, contentId]);
};

export default useSetCurrentContentId;
