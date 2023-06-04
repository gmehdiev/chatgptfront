import { FC, useState } from "react";
import { useThunkDispatch } from "../core/store/store";
import { handleLogin, handleRegister } from "../core/store/slices/user.Slice";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useThunkDispatch();

  return (
    <>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <button
        onClick={() => {
          dispatch(handleLogin({ email, password }));
        }}
      >
        Логин
      </button>
      <button
        onClick={() => {
          dispatch(handleRegister({ email, password }));
        }}
      >
        Регистрация
      </button>
    </>
  );
};
