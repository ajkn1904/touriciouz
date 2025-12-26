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
import { FaUser, FaUserShield, FaUserTie } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([]);
  const [isPending, setIsPending] = useState(false);

  const getError = (field: string) => errors.find((err) => err.field === field)?.message;

  // Demo credentials
  const demoCredentials = {
    tourist: { email: "tourist@gmail.com", password: "123456", role: "Tourist" },
    guide: { email: "guide@gmail.com", password: "123456", role: "Guide" },
    admin: { email: "admin@gmail.com", password: "123456", role: "Admin" }
  };

  const handleDemoLogin = (role: 'tourist' | 'guide' | 'admin') => {
    const credentials = demoCredentials[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
    // Clear errors when demo credentials are loaded
    setErrors([]);
    //toast.success(`${credentials.role} credentials loaded!`);
  };

  // // Validate form fields
  // const validateForm = (): boolean => {
  //   const newErrors: { field: string; message: string }[] = [];

  //   // Email validation
  //   if (!email.trim()) {
  //     newErrors.push({ field: "email", message: "Email is required" });
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  //     newErrors.push({ field: "email", message: "Please enter a valid email address" });
  //   }

  //   // Password validation
  //   if (!password.trim()) {
  //     newErrors.push({ field: "password", message: "Password is required" });
  //   } else if (password.length < 6) {
  //     newErrors.push({ field: "password", message: "Password must be at least 6 characters" });
  //   }

  //   setErrors(newErrors);
  //   return newErrors.length === 0;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    // if (!validateForm()) {
    //   toast.error("Please fix the errors in the form");
    //   return;
    // }

    setIsPending(true);
    setErrors([]);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setIsPending(false);

      if (res?.error) {
        toast.error("Invalid email or password.");
        setErrors([{ field: "password", message: "Invalid email or password" }]);
      } else if (res?.ok) {
        toast.success("Login successful!");
        window.location.href = "/dashboard/my-profile";
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.");
      setErrors([{ field: "password", message: "Unexpected error occurred" }]);
      setIsPending(false);
    }
  };

  // Handle field changes and clear errors
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear email errors when user starts typing
    if (getError("email")) {
      setErrors(errors.filter(err => err.field !== "email"));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear password errors when user starts typing
    if (getError("password")) {
      setErrors(errors.filter(err => err.field !== "password"));
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

      <div className="relative flex min-h-screen w-full items-center justify-center -mt-20 px-6 lg:px-60 py-10 lg:justify-end lg:pl-20">
        <Card className="w-full max-w-md shadow-2xl border border-gray-200 backdrop-blur-md bg-white/80 my-16">
          <CardContent className="space-y-4 py-2 px-6">
            <h1 className="text-center text-2xl font-bold text-gray-800 uppercase mb-5">
              Welcome Back
            </h1>

            {/* Demo Credentials Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Demo Credentials
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 p-2 hover:bg-green-50 hover:border-green-300 transition-colors"
                  onClick={() => handleDemoLogin('tourist')}
                >
                  <FaUser className="h-5 w-5 text-green-600 mb-1" />
                  <span className="uppercase text-sm font-medium">Tourist</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 p-2 hover:bg-green-50 hover:border-green-300 transition-colors"
                  onClick={() => handleDemoLogin('guide')}
                >
                  <FaUserTie className="h-5 w-5 text-green-600 mb-1" />
                  <span className="uppercase text-sm font-medium">Guide</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 p-2 hover:bg-green-50 hover:border-green-300 transition-colors"
                  onClick={() => handleDemoLogin('admin')}
                >
                  <FaUserShield className="h-5 w-5 text-green-600 mb-1" />
                  <span className="uppercase text-sm font-medium">Admin</span>
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in manually</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="h-12 text-base"
                />
                {getError("email") && (
                  <p className="text-red-600 text-sm">{getError("email")}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1">
                <Label>Password</Label>
                <Password
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="h-12 text-base"
                />
                {getError("password") && (
                  <p className="text-red-600 text-sm">{getError("password")}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white mt-4 transition-all duration-300"
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Registration Link */}
              <p className="text-end text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-green-600 hover:text-green-700 font-medium hover:underline"
                >
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