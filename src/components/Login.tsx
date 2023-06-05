import { FC } from "react";
import { handleLogin } from "../core/store/slices/user.Slice";
import { useThunkDispatch } from "../core/store/store";
import { AuthForm } from "./common/AuthForm";
export const Login: FC = () => {
  const dispatch = useThunkDispatch();
  const handleProps = (email: string, password: string) => {
    dispatch(handleLogin({ email, password }));
  };
  return <AuthForm title="login" handleClick={handleProps} />;
};
