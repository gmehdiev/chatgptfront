import { createTheme, ThemeOptions } from "@mui/material";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#7286D3",
    },
    secondary: {
      main: "#236efa",
    },
    background: {
      paper: "#222831",
      default: "#0E131A",
    },
    text: {
      primary: "#b5bcc7",
      secondary: "#6d737d",
    },
  },
};

export const darkTheme = createTheme(darkThemeOptions);
