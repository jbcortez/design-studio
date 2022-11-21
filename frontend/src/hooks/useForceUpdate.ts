import { useState } from "react";

const useForceUpdate = (): (() => void) => {
  const [, setValue] = useState<number>(0);
  return () => setValue((value) => value + 1);
};

export default useForceUpdate;
