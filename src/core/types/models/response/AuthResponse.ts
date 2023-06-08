import { IUser } from "../IUser";

export interface AuthResponse {
    accsessToken: string;
    refreshToken: string;
    user: IUser
}
