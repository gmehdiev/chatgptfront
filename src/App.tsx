import { useEffect } from "react";
import { RootState, useThunkDispatch } from "./core/store/store";
import { checkAuth } from "./core/store/slices/user.Slice";

import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRoutes";
import { getAllChat } from "./core/store/slices/chat.Slice";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useThunkDispatch();
  const { user } = useSelector((state: RootState) => state);
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (!user.authInfo.user.id) return;
    dispatch(getAllChat(user.authInfo.user.id));
  }, [user.authInfo.user.id]);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
