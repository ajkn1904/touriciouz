import type { ComponentType } from 'react';


export type { ILogin, IRegister, IChangePass, IUser, ILoginResponse } from './auth.type'


//generic types
export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}


export type TRole = "ADMIN" | "TOURIST" | "GUIDE";



type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}

export interface ISidebarItems {
    title: string;
    items: {
        title: string;
        url?: string; 
        onClick?: () => void; 
    }[]; 
}


export const role = {
    ADMIN: "ADMIN",
    TOURIST: "TOURIST",
    GUIDE: "GUIDE"
}