import { useSelector } from "react-redux";
import { RootState } from "../core/store/store";

export const MainPage = () => {
  const { user } = useSelector((state: RootState) => state);
  return <>{user.authInfo.user.email}</>;
};
