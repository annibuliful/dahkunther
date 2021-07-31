import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          bg: "brand.400",
          color: "white",
          _hover: {
            bg: "brand.900",
          },
        },
        approve: {
          bg: "green.400",
          color: "white",
          _hover: {
            bg: "green.900",
          },
        },
        reject: {
          bg: "red.400",
          color: "white",
          _hover: {
            bg: "red.900",
          },
        },
      },
    },
  },
  colors: {
    brand: {
      400: "#1A54F8",
      900: "#002cc4",
    },
    error: {
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
    },
    pending: {
      400: "#F7CB73",
    },
    complete: {
      600: "#43a047",
      700: "#388e3c",
      900: "#1b5e20",
    },
  },
});
