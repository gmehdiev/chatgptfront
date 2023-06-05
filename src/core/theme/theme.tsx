import { createContext, FC, PropsWithChildren, useState } from "react";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";
import { GlobalStyles, ThemeProvider } from "@mui/material";

export const ThemeColor = createContext({ toggleColorMode: () => {} });

export const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = {
    toggleColorMode: () => {
      console.log("theme");
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    },
  };
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeColor.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: { backgroundColor: theme.palette.background.default },
          }}
        />
        {children}
      </ThemeProvider>
    </ThemeColor.Provider>
  );
};
