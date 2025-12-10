"use client";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Password from "@/src/components/ui/Password";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full font-serif">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492133969098-09ba49699f47?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/10 hidden sm:block" />

      {/* FORM SECTION */}
      <div className="relative flex min-h-screen w-full items-center justify-center -mt-24 px-6 lg:px-60 py-10 lg:justify-end lg:pl-20">
        <Card className="w-full max-w-md shadow-2xl border border-gray-200 backdrop-blur-md bg-white/80">
          <CardContent className="space-y-4 py-2 px-6">

            {/* Title */}
            <h1 className="text-center text-2xl font-bold text-gray-800 uppercase my-5">
              Welcome Back
            </h1>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 text-base"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <Password placeholder="Enter your password"
                className="h-12 text-base"
              />
            </div>

            {/* Button */}
            <Button className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white mt-4">
              Login
            </Button>
            
            <p className="text-end text-sm">Create account? <Link href={"/register"} className="text-blue-500">Register now.</Link></p>

          </CardContent>
        </Card>
      </div>

    </div>
  );
}
