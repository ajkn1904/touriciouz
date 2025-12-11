"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import Phone from "@/src/components/ui/Phone";
import Password from "@/src/components/ui/Password";
import Link from "next/link";
import { toast } from "sonner";
import { useActionState } from "react";

import { registerUser } from "@/src/services/auth/registerUser";

export default function RegisterPage() {

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@gmail.com");
  const [phone, setPhone] = useState("+8801234567890");
  const [role, setRole] = useState("TOURIST");
  const [address, setAddress] = useState("Kotwali, Chittagong");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");

  const [state, formAction, isPending] = useActionState(registerUser, null);

  
  const safeState = state ?? { success: false, errors: [] as { field: string; message: string }[] };

  // Show toast messages
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      if ("message" in state && state.message) {
        toast.success(state.message);
      } else {
        toast.success("Registration successful!");
      }
    } else {
      if ("message" in state && state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);

 
  const getError = (field: string) => {
    if ("errors" in safeState && Array.isArray(safeState.errors)) {
      const errorObj = safeState.errors.find((err) => err.field === field);
      return errorObj?.message;
    }
    return null;
  };

  return (
    <div className="relative min-h-screen w-full font-serif">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492133969098-09ba49699f47?q=80&w=1331')",
        }}
      />
      <div className="absolute inset-0 bg-black/10 hidden sm:block" />

      <div className="relative flex min-h-screen w-full items-center justify-center px-6 lg:px-60 py-10 lg:justify-end lg:pl-20">

        <Card className="w-full max-w-md shadow-2xl border border-gray-200 backdrop-blur-md bg-white/80">
          <CardContent className="space-y-4 py-2 px-6">

            <h1 className="text-center text-2xl font-bold text-gray-800 uppercase my-5">
              Create Account
            </h1>

            <form action={formAction} className="space-y-4">

              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label>Name</Label>
                <Input
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {getError("name") && <p className="text-red-600 text-sm">{getError("name")}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {getError("email") && <p className="text-red-600 text-sm">{getError("email")}</p>}
              </div>

              {/* Phone + Role */}
              <div className="flex gap-2">
                <div className="w-full flex flex-col gap-1">
                  <Label>Phone</Label>
                  <Phone
                    name="phone"
                    value={phone}
                    onChange={setPhone}
                  />
                  {getError("phone") && <p className="text-red-600 text-sm">{getError("phone")}</p>}
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Label>Role</Label>
                  <Select
                    name="role"
                    value={role}
                    onValueChange={setRole}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="TOURIST">Tourist</SelectItem>
                        <SelectItem value="GUIDE">Guide</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {getError("role") && <p className="text-red-600 text-sm">{getError("role")}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1">
                <Label>Address</Label>
                <Textarea
                  name="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {getError("address") && <p className="text-red-600 text-sm">{getError("address")}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <Label>Password</Label>
                <Password
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                {getError("password") && <p className="text-red-600 text-sm">{getError("password")}</p>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <Label>Confirm Password</Label>
                <Password
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}

                />
                {getError("confirmPassword") && <p className="text-red-600 text-sm">{getError("confirmPassword")}</p>}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-10 text-lg bg-green-600 hover:bg-green-700 text-white mt-4"
              >
                {isPending ? "Registering..." : "Register"}
              </Button>

              <p className="text-end text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500">Login</Link>
              </p>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
