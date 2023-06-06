// import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./core/store/store.ts";
import { CustomThemeProvider } from "./core/theme/theme.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  //     </React.StrictMode>
  <CustomThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CustomThemeProvider>
);
