import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Colors } from "../types";
import { setCustomColors } from "../redux/themeSlice";
import { getCustomColors } from "../util/services/themeServices";

const useUpdateCustomColors = () => {
  const dispatch = useDispatch();

  const [colors, setColors] = useState<Colors>([]);

  useEffect(() => {
    const controller = new AbortController();
    getCustomColors(controller).then((res) => {
      if (res) setColors([...res]);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (colors.length > 0) {
      dispatch(setCustomColors({ customColors: colors }));
    }
  }, [colors, dispatch]);
};

export default useUpdateCustomColors;
