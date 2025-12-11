// /src/utils/TagsInput.tsx
"use client";

import { useState, type KeyboardEvent, type Dispatch, type SetStateAction, useEffect } from "react";
import { XIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";

interface TagsInputProps {
  value?: string[]; // allow undefined initial
  onChange: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
  maxTagLength?: number;
}

export default function TagsInput({
  value = [],
  onChange,
  placeholder,
  maxTagLength = 120,
}: TagsInputProps) {
  const [input, setInput] = useState("");

  // sync input if parent clears tags externally
  useEffect(() => {
    // no-op, but keeps component resilient
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;
      if (trimmed.length > maxTagLength) {
        // optionally show a toast or ignore
        setInput("");
        return;
      }
      if (!value.includes(trimmed)) {
        try {
          onChange([...value, trimmed]);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("TagsInput onChange error:", err);
        }
      }
      setInput("");
    } else if (e.key === "Backspace" && input === "" && value.length > 0) {
      // remove last tag on backspace when input empty
      try {
        onChange(value.slice(0, -1));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("TagsInput backspace remove error:", err);
      }
    }
  };

  const removeTag = (tag: string) => {
    try {
      onChange(value.filter((t) => t !== tag));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("TagsInput removeTag error:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 border rounded-lg p-2 items-center min-h-[44px]">
        {value.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-green-100 text-black rounded px-2 py-1 text-sm font-semibold"
          >
            <span className="max-w-xs truncate">{tag}</span>
            <button
              className="ml-2 p-0 text-green-900 h-7 w-7 bg-white rounded-full flex items-center justify-center"
              onClick={() => removeTag(tag)}
              type="button"
              aria-label={`Remove ${tag}`}
            >
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        ))}

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-none shadow-none focus:ring-0 focus:outline-none min-w-[120px]"
          aria-label="tags input"
        />
      </div>
      <p className="text-muted-foreground text-xs">Press Enter to add item</p>
    </div>
  );
}
