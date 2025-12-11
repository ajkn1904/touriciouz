/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt from "jsonwebtoken";

export const verifyAccessToken = async (token: string) => {
    try {
        const verifiedAccessToken = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as jwt.JwtPayload;

        return {
            success: true,
            message: "Token is valid",
            payload: verifiedAccessToken,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Invalid token",
        };
    }
};

export const verifyResetPasswordToken = async (token: string) => {
    try {
        const verifiedResetToken = jwt.verify(
            token,
            process.env.RESET_PASS_TOKEN as string
        ) as jwt.JwtPayload;
        return {
            success: true,
            message: "Token is valid",
            payload: verifiedResetToken,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Invalid token",
        };
    }
};
