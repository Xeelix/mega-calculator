import { Delete, Divide, X, Minus, Plus } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { ButtonType } from "../core/calculator-button";

export type KeypadAction =
  | "number"
  | "operator"
  | "equals"
  | "decimal"
  | "clear"
  | "backspace"
  | "parenthesis";

export interface KeypadButton {
  value: string;
  label?: string;
  icon?: LucideIcon;
  type: ButtonType;
  action: KeypadAction;
  colSpan?: 1 | 2;
}

// Standard calculator layout
export const standardKeypadLayout: KeypadButton[] = [
  { value: "(", label: "(", type: "operator", action: "parenthesis" },
  { value: ")", label: ")", type: "operator", action: "parenthesis" },
  { value: "backspace", icon: Delete, type: "function", action: "backspace" },
  { value: "/", icon: Divide, type: "operator", action: "operator" },

  { value: "7", type: "number", action: "number" },
  { value: "8", type: "number", action: "number" },
  { value: "9", type: "number", action: "number" },
  { value: "*", icon: X, type: "operator", action: "operator" },

  { value: "4", type: "number", action: "number" },
  { value: "5", type: "number", action: "number" },
  { value: "6", type: "number", action: "number" },
  { value: "-", icon: Minus, type: "operator", action: "operator" },

  { value: "1", type: "number", action: "number" },
  { value: "2", type: "number", action: "number" },
  { value: "3", type: "number", action: "number" },
  { value: "+", icon: Plus, type: "operator", action: "operator" },

  { value: "clear", label: "C", type: "function", action: "clear" },
  { value: "0", type: "number", action: "number" },
  { value: ".", type: "number", action: "decimal" },
  { value: "=", type: "equals", action: "equals" },
];
