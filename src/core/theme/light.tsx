import { createTheme, ThemeOptions } from "@mui/material";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#7286D3",
    },
    secondary: {
      main: "#012e82",
    },
    background: {
      paper: "#e6ecf0",
    },
    text: {
      primary: "#52616B",
      secondary: "#797f8a",
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
