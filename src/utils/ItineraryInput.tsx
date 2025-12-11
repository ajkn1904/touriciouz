"use client";

import { useState } from "react";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function ItineraryInput({ value, onChange, placeholder }: Props) {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      // Automatically add "Day n: " prefix
      const newItem = `Day ${value.length + 1}: ${trimmed}`;
      onChange([...value, newItem]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="border rounded p-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((day, idx) => (
          <div
            key={idx}
            className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-lg"
          >
            {day}
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="ml-2 p-0 text-green-900 h-7 w-7 bg-white rounded-full"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder={placeholder || "Add itinerary day"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border rounded px-2 py-1"
      />
    </div>
  );
}
