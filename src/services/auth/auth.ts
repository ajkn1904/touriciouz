"use server";
import { FieldValues } from "react-hook-form";


export const login = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api"}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res?.ok) {
    console.error("Login Failed", await res.text());
  }
  return await res.json();
};