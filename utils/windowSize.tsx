import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const f = function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", f);
      f();
      return () => window.removeEventListener("resize", f);
    }
  }, []);
  return windowSize;
}
