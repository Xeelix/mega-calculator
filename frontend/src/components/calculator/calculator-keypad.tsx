"use client";

import { CalculatorButton } from "./calculator-button";
import { KeypadButton, KeypadAction, standardKeypadLayout } from "./keypad-config";

interface CalculatorKeypadProps {
  handleNumberInput: (num: string) => void;
  handleOperatorInput: (operator: string) => void;
  handleEquals: () => void;
  handleDecimal: () => void;
  handleClear: () => void;
  handleBackspace: () => void;
  handleParenthesis: (parenthesis: string) => void;
  layout?: KeypadButton[]; // Optional custom layout
}

export function CalculatorKeypad({
  handleNumberInput,
  handleOperatorInput,
  handleEquals,
  handleDecimal,
  handleClear,
  handleBackspace,
  handleParenthesis,
  layout = standardKeypadLayout, // Default to standard layout
}: CalculatorKeypadProps) {
  // Handler map for different button actions
  const actionHandlers: Record<KeypadAction, (value: string) => void> = {
    number: handleNumberInput,
    operator: handleOperatorInput,
    equals: () => handleEquals(),
    decimal: () => handleDecimal(),
    clear: () => handleClear(),
    backspace: () => handleBackspace(),
    parenthesis: handleParenthesis,
  };

  // Handle button click by dispatching to the appropriate handler
  const handleButtonClick = (button: KeypadButton) => {
    const handler = actionHandlers[button.action];
    if (handler) {
      handler(button.value);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {layout.map((button, index) => (
        <CalculatorButton
          key={`calc-btn-${index}`}
          value={button.value}
          onClick={() => handleButtonClick(button)}
          type={button.type}
          icon={button.icon}
          colSpan={button.colSpan}
        >
          {button.label}
        </CalculatorButton>
      ))}
    </div>
  );
} 