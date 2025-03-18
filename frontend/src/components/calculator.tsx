"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCalculatorStore } from "@/store/calculator-store";
import { CalculationDto } from "@/lib/api";
import {
  Plus,
  Minus,
  X,
  Divide,
  Delete,
  RotateCcw,
  Brain,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function Calculator() {
  const {
    currentExpression,
    memory,
    history,
    isLoading,
    showHistory,
    toggleShowHistory,
    setCurrentExpression,
    calculate,
    setMemory,
    clearMemory,
    clearCurrentExpression,
    clearHistory,
  } = useCalculatorStore();

  const [displayValue, setDisplayValue] = useState("0");

  // Update the display value when currentExpression changes
  useEffect(() => {
    setDisplayValue(currentExpression || "0");
  }, [currentExpression]);

  // Add keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      // Numbers and operators
      if (/^[0-9]$/.test(key)) {
        handleNumberInput(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperatorInput(key);
      } else if (key === ".") {
        handleDecimal();
      } else if (key === "Enter" || key === "=") {
        handleEquals();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentExpression]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle numeric input
  const handleNumberInput = (num: string) => {
    if (currentExpression === "0" || currentExpression === "") {
      setCurrentExpression(num);
    } else {
      setCurrentExpression(currentExpression + num);
    }
  };

  // Handle operator input
  const handleOperatorInput = (operator: string) => {
    // Avoid consecutive operators
    const lastChar = currentExpression.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
      setCurrentExpression(currentExpression.slice(0, -1) + operator);
    } else {
      setCurrentExpression(currentExpression + operator);
    }
  };

  // Handle decimal point
  const handleDecimal = () => {
    // Check if the last number already has a decimal
    const parts = currentExpression.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];

    if (!lastPart.includes(".")) {
      setCurrentExpression(currentExpression + ".");
    }
  };

  // Handle equals
  const handleEquals = async () => {
    if (!currentExpression || currentExpression === "0") {
      return; // Don't calculate empty expressions
    }

    try {
      // Validate expression structure before submitting
      // This is a simple check to catch basic syntax errors
      // eslint-disable-next-line no-new-func
      new Function(`return ${currentExpression}`)();

      await calculate(currentExpression);
    } catch (error) {
      // If local validation fails, don't send to API
      console.error("Invalid expression:", error);
      toast.error("Invalid expression");
    }
  };

  // Handle clear
  const handleClear = () => {
    clearCurrentExpression();
  };

  // Handle backspace
  const handleBackspace = () => {
    if (currentExpression.length > 0) {
      setCurrentExpression(currentExpression.slice(0, -1));
    }
    if (currentExpression.length === 1) {
      setCurrentExpression("0");
    }
  };

  // Memory functions
  const handleMemoryAdd = () => {
    if (currentExpression) {
      try {
        // Use Function constructor for safe evaluation
        const result = new Function(`return ${currentExpression}`)();
        setMemory(memory + result);
      } catch (error) {
        console.error("Invalid expression for memory addition");
      }
    }
  };

  const handleMemorySubtract = () => {
    if (currentExpression) {
      try {
        const result = new Function(`return ${currentExpression}`)();
        setMemory(memory - result);
      } catch (error) {
        console.error("Invalid expression for memory subtraction");
      }
    }
  };

  const handleMemoryRecall = () => {
    if (memory !== 0) {
      if (currentExpression === "0") {
        setCurrentExpression(memory.toString());
      } else {
        setCurrentExpression(currentExpression + memory.toString());
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Calculator</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleShowHistory}
                aria-label="Toggle history"
                className="relative overflow-hidden group"
              >
                <motion.div
                  animate={{
                    rotate: showHistory ? 360 : 0
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <History className="h-4 w-4" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/5 rounded-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Button>
              <div className="flex items-center gap-1 text-xs bg-secondary/50 px-2 py-1 rounded-md">
                <Brain className="h-3 w-3" />
                <span className="font-mono">{memory}</span>
              </div>
            </div>
          </div>
          <CardDescription>
            {isLoading
              ? "Calculating..."
              : "Perform calculations with memory functions"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Display */}
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

            {/* Memory buttons */}
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMemoryAdd}
                className="text-xs"
              >
                M+
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMemorySubtract}
                className="text-xs"
              >
                M-
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMemoryRecall}
                className="text-xs"
              >
                MR
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearMemory}
                className="text-xs"
              >
                MC
              </Button>
            </div>

            {/* Calculator buttons */}
            <div className="grid grid-cols-4 gap-2">
              {/* First row */}
              <Button
                variant="outline"
                onClick={handleClear}
                className="col-span-2"
              >
                Clear
              </Button>
              <Button variant="outline" onClick={handleBackspace}>
                <Delete className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleOperatorInput("/")}
              >
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
              <Button
                variant="secondary"
                onClick={() => handleOperatorInput("*")}
              >
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
              <Button
                variant="secondary"
                onClick={() => handleOperatorInput("-")}
              >
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
              <Button
                variant="secondary"
                onClick={() => handleOperatorInput("+")}
              >
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
          </div>
        </CardContent>

        {/* History section */}
        <CardFooter
          className={cn(
            "block p-0 overflow-hidden transition-all duration-300",
            showHistory ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium flex items-center gap-1">
                <History className="h-4 w-4" />
                Calculation History
              </h3>
              {history.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7"
                  onClick={clearHistory}
                >
                  Clear History
                </Button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">
                No calculations yet
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {history.map((calculation: CalculationDto, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col p-3 rounded-md bg-secondary/20 hover:bg-secondary/30 transition-colors text-sm cursor-pointer"
                    onClick={() =>
                      setCurrentExpression(calculation.result.toString())
                    }
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground truncate max-w-[80%]">
                        {calculation.expression}
                      </span>
                      <div className="font-medium text-base">
                        {calculation.result}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
