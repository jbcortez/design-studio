import { useEffect, useState } from "react";
// Source: https://dev.to/oussel/how-to-use-conditional-rendering-with-animation-in-react-1k20
const useDelayUnmount = (isMounted: boolean, delayTime: number) => {
  const [showDiv, setShowDiv] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: any;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime); //delay our unmount
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showDiv]);
  return showDiv;
};

export default useDelayUnmount;
