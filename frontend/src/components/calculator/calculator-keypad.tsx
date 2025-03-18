"use client";

import { Button } from "@/components/ui/button";
import { Delete, Divide, X, Minus, Plus } from "lucide-react";

interface CalculatorKeypadProps {
  handleNumberInput: (num: string) => void;
  handleOperatorInput: (operator: string) => void;
  handleEquals: () => void;
  handleDecimal: () => void;
  handleClear: () => void;
  handleBackspace: () => void;
}

export function CalculatorKeypad({
  handleNumberInput,
  handleOperatorInput,
  handleEquals,
  handleDecimal,
  handleClear,
  handleBackspace,
}: CalculatorKeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {/* First row */}
      <Button variant="outline" onClick={handleClear} className="col-span-2">
        Clear
      </Button>
      <Button variant="outline" onClick={handleBackspace}>
        <Delete className="h-4 w-4" />
      </Button>
      <Button variant="secondary" onClick={() => handleOperatorInput("/")}>
        <Divide className="h-4 w-4" />
      </Button>

      {/* Second row */}
      <Button variant="default" onClick={() => handleNumberInput("7")}>
        7
      </Button>
      <Button variant="default" onClick={() => handleNumberInput("8")}>
        8
      </Button>
      <Button variant="default" onClick={() => handleNumberInput("9")}>
        9
      </Button>
      <Button variant="secondary" onClick={() => handleOperatorInput("*")}>
        <X className="h-4 w-4" />
      </Button>

      {/* Third row */}
      <Button variant="default" onClick={() => handleNumberInput("4")}>
        4
      </Button>
      <Button variant="default" onClick={() => handleNumberInput("5")}>
        5
      </Button>
      <Button variant="default" onClick={() => handleNumberInput("6")}>
        6
      </Button>
      <Button variant="secondary" onClick={() => handleOperatorInput("-")}>
        <Minus className="h-4 w-4" />
      </Button>

      {/* Fourth row */}
      <Button variant="default" onClick={() => handleNumberInput("1")}>
        1
      </Button>
      <Button variant="default" onClick={() => handleNumberInput("2")}>
        2
      </Button>
      <Button variant="default" onClick={() => handleNumberInput("3")}>
        3
      </Button>
      <Button variant="secondary" onClick={() => handleOperatorInput("+")}>
        <Plus className="h-4 w-4" />
      </Button>

      {/* Fifth row */}
      <Button
        variant="default"
        onClick={() => handleNumberInput("0")}
        className="col-span-2"
      >
        0
      </Button>
      <Button variant="default" onClick={handleDecimal}>
        .
      </Button>
      <Button
        variant="secondary"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleEquals}
      >
        =
      </Button>
    </div>
  );
} 