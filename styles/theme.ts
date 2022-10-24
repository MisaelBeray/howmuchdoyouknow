import { extendTheme, ChakraTheme } from "@chakra-ui/react";

const customTheme: Partial<ChakraTheme> = {
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  colors: {
    primary: "#845EC2"
  }
};

export const theme = extendTheme(customTheme);