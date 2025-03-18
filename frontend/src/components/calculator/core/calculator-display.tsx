"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface CalculatorDisplayProps {
  currentExpression: string;
  setCurrentExpression: (value: string) => void;
  handleClear: () => void;
}

export function CalculatorDisplay({
  currentExpression,
  setCurrentExpression,
  handleClear,
}: CalculatorDisplayProps) {
  const [displayValue, setDisplayValue] = useState("0");

  // Update the display value when currentExpression changes
  useEffect(() => {
    setDisplayValue(currentExpression || "0");
  }, [currentExpression]);

  return (
    <div className="relative">
      <Input
        type="text"
        value={displayValue}
        onChange={(e) => setCurrentExpression(e.target.value)}
        className="text-left text-lg font-mono h-14 pl-3 pr-10 overflow-x-auto"
        readOnly
      />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      {displayValue !== "0" && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
          onClick={handleClear}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
} 