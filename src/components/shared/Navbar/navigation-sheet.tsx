"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavMenu } from "./nav-menu";
import { Logo } from "./logo";
import { HiOutlineMenu } from "react-icons/hi";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full mx-2">
          <HiOutlineMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <div className="flex items-start justify-between px-4 py-2 border-b border-gray-200">
          <Logo />
        </div>
        <NavMenu orientation="vertical" />
      </SheetContent>
    </Sheet>
  );
};
