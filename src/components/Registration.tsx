import { FC } from "react";
import { handleRegister } from "../core/store/slices/user.Slice";
import { useThunkDispatch } from "../core/store/store";
import { AuthForm } from "./common/AuthForm";
export const Registration: FC = () => {
  const dispatch = useThunkDispatch();
  const handleProps = (email: string, password: string) => {
    dispatch(handleRegister({ email, password }));
  };
  return <AuthForm title="registration" handleClick={handleProps} />;
};
