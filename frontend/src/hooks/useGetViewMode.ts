import { useEffect, useState } from "react";
import useQuery from "./useQuery";

const useGetViewMode = (): string | null | -1 => {
  const [viewMode, setViewMode] = useState<string | null | -1>(null);
  const query = useQuery();
  const param = query.get("viewMode");

  useEffect(() => {
    if (param) {
      setViewMode(param);
    } else {
      setViewMode(-1);
    }
  }, [param]);

  return viewMode;
};

export default useGetViewMode;
