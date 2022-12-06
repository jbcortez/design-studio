import { useEffect, useRef } from "react";
import { addTheme } from "../util/services/themeServices";
import { Theme } from "../types";
import { setTheme } from "../redux/themeSlice";
import { useAppDispatch } from "../redux/reduxHooks";

const themeEnum: Theme = {
  theme: [
    { value: "#FFFFFF", id: "color-1" },
    { value: "#E8E6E6", id: "color-2" },
    { value: "#C7C7C7", id: "color-3" },
    { value: "#757575", id: "color-4" },
    { value: "#000000", id: "color-5" },
    { value: "#4A9183", id: "color-6" },
    { value: "#35685E", id: "color-7" },
    { value: "#014235", id: "color-8" },
    { value: "#1D2927", id: "color-9" },
    { value: "#000000", id: "color-10" },
    { value: "#DCE3F5", id: "color-11" },
    { value: "#C0CBED", id: "color-12" },
    { value: "#97ADED", id: "color-13" },
    { value: "#4B5676", id: "color-14" },
    { value: "#262B3B", id: "color-15" },
    { value: "#E1C1BC", id: "color-16" },
    { value: "#C29992", id: "color-17" },
    { value: "#A45F53", id: "color-18" },
    { value: "#6D3F37", id: "color-19" },
    { value: "#37201C", id: "color-20" },
    { value: "#FFFDF7", id: "color-21" },
    { value: "#FAF5EB", id: "color-22" },
    { value: "#F4EBD7", id: "color-23" },
    { value: "#C3BCAC", id: "color-24" },
    { value: "#7A766C", id: "color-25" },
  ],
  custom: [{ id: "12345", value: "#FFFF" }],
};

const useAddTheme = () => {
  const hasRendered = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!hasRendered.current) {
      const controller = new AbortController();

      addTheme(themeEnum, controller)
        .then((res) => {
          if (res?.data) dispatch(setTheme({ theme: res.data }));
        })
        .catch((e) => console.error("error adding theme: ", e));
    }

    return () => {
      hasRendered.current = true;
    };
  }, [dispatch]);
};

export default useAddTheme;
