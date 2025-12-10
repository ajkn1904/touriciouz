"use client";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import Phone from "@/src/components/ui/Phone";
import Password from "@/src/components/ui/Password";
import Link from "next/link";

export default function RegisterPage() {
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
      <div className="relative flex min-h-screen w-full items-center justify-center px-6 lg:px-60 py-10 lg:justify-end lg:pl-20">

        <Card className="w-full max-w-md shadow-2xl border border-gray-200 backdrop-blur-md bg-white/80">
          <CardContent className="space-y-4 py-2 px-6">
            <h1 className="text-center text-2xl font-bold text-gray-800 uppercase my-5">
              Create Account
            </h1>
            {/* Name */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="uppercase my-1">Name</Label>
              <Input type="text" placeholder="Enter your name" className="w-full h-10 text-base" />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="uppercase my-1">Email</Label>
              <Input type="email" placeholder="Enter your email" className="w-full h-10 text-base" />
            </div>

            <div className="flex gap-2 justify-between">


              {/* Phone */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="uppercase my-1">Phone</Label>
                <Phone placeholder="Enter your phone" className="w-full h-10 text-base" />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="uppercase my-1">Role</Label>
                <Select>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      <SelectItem value="TOURIST">Tourist</SelectItem>
                      <SelectItem value="GUIDE">Guide</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Address */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="uppercase my-1">Address</Label>
              <Textarea placeholder="Enter your address" className="w-full text-base" />
            </div>
            {/* Password */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="uppercase my-1">Password</Label>
              <Password placeholder="Enter your password" className="w-full h-10 text-base" />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="uppercase my-1">Confirm Password</Label>
              <Password placeholder="Confirm your password" className="w-full h-10 text-base" />
            </div>

            {/* Submit Button */}
            <Button className="w-full h-10 text-lg bg-green-600 hover:bg-green-700 text-white mt-4">
              Register
            </Button>

            <p className="text-end text-sm">Already have an account? <Link href={"/login"} className="text-blue-500">Login</Link></p>

          </CardContent>
        </Card>
      </div>

    </div>
  );
}
