"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Password from "@/src/components/ui/Password";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function LoginPage() {


  const [email, setEmail] = useState("tourist@gmail.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [isPending, setIsPending] = useState(false);

  const getError = (field: string) => errors.find((err) => err.field === field)?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setErrors([]);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        //redirect: false,
        callbackUrl: "/dashboard/my-profile",
      });

      setIsPending(false);

      if (res?.error) {
        toast.error("Invalid email or password.");
        setErrors([{ field: "password", message: "Invalid email or password" }]);
      } else if (res?.ok && res.url) {
        window.location.href = res.url; // <-- keeps working redirect
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.");
      setErrors([{ field: "password", message: "Unexpected error" }]);
      setIsPending(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full font-serif">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492133969098-09ba49699f47?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="absolute inset-0 bg-black/10 hidden sm:block" />

      <div className="relative flex min-h-screen w-full items-center justify-center -mt-24 px-6 lg:px-60 py-10 lg:justify-end lg:pl-20">
        <Card className="w-full max-w-md shadow-2xl border border-gray-200 backdrop-blur-md bg-white/80">
          <CardContent className="space-y-4 py-2 px-6">
            <h1 className="text-center text-2xl font-bold text-gray-800 uppercase my-5">
              Welcome Back
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                />
                {getError("email") && (
                  <p className="text-red-600 text-sm">{getError("email")}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <Label>Password</Label>
                <Password
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="h-12 text-base"
                />
                {getError("password") && (
                  <p className="text-red-600 text-sm">{getError("password")}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white mt-4"
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>

              <p className="text-end text-sm">
                Create account?{" "}
                <Link href="/register" className="text-blue-500">
                  Register now.
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
