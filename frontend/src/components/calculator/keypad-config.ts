import { Delete, Divide, X, Minus, Plus } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { ButtonType } from "./calculator-button";

export type KeypadAction = 
  | "number" 
  | "operator" 
  | "equals" 
  | "decimal" 
  | "clear" 
  | "backspace";

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
  { value: "clear", label: "Clear", type: "function", action: "clear", colSpan: 2 },
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
  
  { value: "0", type: "number", action: "number", colSpan: 2 },
  { value: ".", type: "number", action: "decimal" },
  { value: "=", type: "equals", action: "equals" },
]; 