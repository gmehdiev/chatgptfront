import { useEffect } from "react";
import { useThunkDispatch } from "./core/store/store";
import { checkAuth } from "./core/store/slices/user.Slice";

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRoutes";

function App() {
  const dispatch = useThunkDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
