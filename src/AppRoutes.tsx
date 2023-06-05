import { useSelector } from "react-redux";
import { RootState } from "./core/store/store";
import { StatusRequestEnum } from "./core/types/enums/StatusRequestEnum";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "./Pages/Loader/Loader";
import { LoginPage } from "./Pages/Authentication/LoginPage";
import { Registration } from "./components/Registration";
import { MainPage } from "./Pages/MainPage/MainPage";

export const AppRouter = () => {
  const { user } = useSelector((state: RootState) => state);

  return typeof user.authInfo.isAuth === "undefined" ? (
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : user.authInfo.isAuth === false ? (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
