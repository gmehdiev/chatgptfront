import { useContext, useEffect } from "react";
import { RootState, useThunkDispatch } from "./core/store/store";
import { checkAuth } from "./core/store/slices/user.Slice";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRoutes";

function App() {
  const dispatch = useThunkDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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
