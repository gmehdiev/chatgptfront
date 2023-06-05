import { useContext, useEffect } from "react";
import { RootState, useThunkDispatch } from "./core/store/store";
import { checkAuth } from "./core/store/slices/user.Slice";
import { useSelector } from "react-redux";
import { ThemeColor } from "./core/theme/theme";
import { MaterialUISwitch } from "./components/UI/MaterialUISwitch";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRoutes";

function App() {
  const dispatch = useThunkDispatch();
  const user = useSelector((state: RootState) => state);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);
  const toggleTheme = useContext(ThemeColor);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
{
  /* <MaterialUISwitch onChange={toggleTheme.toggleColorMode} /> */
}
