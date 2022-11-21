import { useEffect, useState } from "react";

const useWidthRatio = (parentWidth) => {
  const [widthRatio, setWidthRatio] = useState<number>(0);

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    if (windowWidth && windowWidth < parentWidth) {
      setWidthRatio(Math.round((windowWidth / parentWidth) * 100) / 100);
    } else {
      setWidthRatio(1);
    }
  }, [windowWidth, parentWidth]);

  function resize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return widthRatio;
};

export default useWidthRatio;
