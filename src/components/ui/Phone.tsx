/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import RPNInput, { type DefaultInputComponentProps } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { cn } from "@/lib/utils"
import { Input } from "@/src/components/ui/input"

const PhoneInput = React.forwardRef<HTMLInputElement, DefaultInputComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-slot="phone-input"
        className={cn(
          "-ms-px rounded-s-none shadow-none focus-visible:z-10 bg-white dark:bg-black",
          className
        )}
        {...props}
      />
    )
  }
)

PhoneInput.displayName = "PhoneInput"

interface PhoneProps {
  onChange?: (value: string) => void;
  [key: string]: any;
}

export default function Phone({onChange, ...field }: PhoneProps) {
  // Ensure onChange is always a function with the correct signature
  const handleChange = (value?: string) => {
    if (onChange) {
      onChange(value ?? "");
    }
  };

  return (
    <div className="*:not-first:mt-2">
      <RPNInput
        international
        defaultCountry="BD"
        placeholder="Enter phone number"
        inputComponent={PhoneInput}
        onChange={handleChange}
        {...field}
        className="phone-input"
      />
    </div>
  )
}
