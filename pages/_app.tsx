import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { theme } from "../styles/theme";

function useWindowSize() {
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

function MyApp({ Component, pageProps }: AppProps) {
  const size = useWindowSize();
  
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} size={size} />
    </ChakraProvider>
  );
}

export default MyApp;
