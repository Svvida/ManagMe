import { Role } from "./enums";
import { IUser } from "./users";

export interface ILoginRequest {
  identifier: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

export interface IRegisterRequest {
  identifier: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface IRegisterResponse {
  accessToken: string;
  user: IUser;
}

export interface IRefreshResponse {
  accessToken: string;
  user: IUser;
}
