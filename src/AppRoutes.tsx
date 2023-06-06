import { useSelector } from "react-redux";
import { RootState } from "./core/store/store";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "./Pages/Loader/Loader";
import { MainPage } from "./Pages/MainPage/MainPage";
import { Navbar } from "./components/Navbar/Navbar";

export const AppRouter = () => {
  const { user } = useSelector((state: RootState) => state);

  return typeof user.authInfo.isAuth === "undefined" ? (
    <Routes>
      <Route path="/" element={<Loader />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
};
