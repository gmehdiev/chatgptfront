import { useSelector } from "react-redux";
import { RootState, useThunkDispatch } from "../../core/store/store";
import { Button } from "@mui/material";
import { logout } from "../../core/utils/Auth";
import { Registration } from "../../components/Registration";

export const MainPage = () => {
  const dispatch = useThunkDispatch();
  const { user } = useSelector((state: RootState) => state);
  return (
    <>
      <Registration />
      вы авторизованны
      {user.authInfo.user.email || user.authInfo.user.id || `Aнонимно`}
      {user.authInfo.user.isActivated ? (
        <>Ваша почта подтверждена</>
      ) : (
        <>Ваша почта НЕ подтверждена</>
      )}
      <Button onClick={() => dispatch(logout)}>asdasds</Button>
    </>
  );
};
