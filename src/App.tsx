import { useContext, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { RootState, useThunkDispatch } from "./core/store/store";
import { checkAuth } from "./core/store/slices/user.Slice";
import { useSelector } from "react-redux";
import { ThemeColor } from "./core/theme/theme";
import { MaterialUISwitch } from "./components/UI/MaterialUISwitch";
import { Button } from "@mui/material";
import { AuthForm } from "./components/common/AuthForm";

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
    <>
      <AuthForm />
      <Button variant="contained">adsad</Button>
      <MaterialUISwitch onChange={toggleTheme.toggleColorMode} />
    </>
  );
}

export default App;
