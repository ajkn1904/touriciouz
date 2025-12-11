import type { TRole } from ".";

//normal types
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: TRole;
  phone?: string;
  address?: string;
}

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
  refreshToken?: string;
}


export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    name:string;
    email: string;
    password: string;
    role: string;
    phone?: string;
    address?: string;
}


export interface IChangePass {
    oldPassword: string;
    newPassword: string;
}