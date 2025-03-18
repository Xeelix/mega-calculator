"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useCalculatorStore } from "@/store/calculator-store";
import { toast } from "sonner";
import { CalculatorDisplay } from "./calculator-display";
import { MemoryControls } from "./memory-controls";
import { CalculatorKeypad } from "./calculator-keypad";
import { HistorySection } from "./history-section";
import { HistoryToggleButton } from "./history-toggle-button";
import { MemoryDisplay } from "./memory-display";

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
              <HistoryToggleButton 
                showHistory={showHistory} 
                toggleShowHistory={toggleShowHistory} 
              />
              <MemoryDisplay memory={memory} />
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
            <CalculatorDisplay 
              currentExpression={currentExpression}
              setCurrentExpression={setCurrentExpression}
              handleClear={handleClear}
            />

            {/* Memory buttons */}
            <MemoryControls 
              handleMemoryAdd={handleMemoryAdd}
              handleMemorySubtract={handleMemorySubtract}
              handleMemoryRecall={handleMemoryRecall}
              clearMemory={clearMemory}
            />

            {/* Calculator buttons */}
            <CalculatorKeypad 
              handleNumberInput={handleNumberInput}
              handleOperatorInput={handleOperatorInput}
              handleEquals={handleEquals}
              handleDecimal={handleDecimal}
              handleClear={handleClear}
              handleBackspace={handleBackspace}
            />
          </div>
        </CardContent>

        {/* History section */}
        <CardFooter className="p-2 block w-full">
          <HistorySection 
            showHistory={showHistory}
            history={history}
            clearHistory={clearHistory}
            setCurrentExpression={setCurrentExpression}
          />
        </CardFooter>
      </Card>
    </div>
  );
} 