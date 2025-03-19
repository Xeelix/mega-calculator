import { Plus, Minus, CornerDownLeft, Trash2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { MemoryActionType } from "./memory-button";

export interface MemoryAction {
  type: MemoryActionType;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

export const memoryControlsConfig: MemoryAction[] = [
  {
    type: "add",
    label: "M+",
    icon: Plus,
    description: "Add current value to memory",
  },
  {
    type: "subtract",
    label: "M-",
    icon: Minus,
    description: "Subtract current value from memory",
  },
  {
    type: "recall",
    label: "MR",
    icon: CornerDownLeft,
    description: "Recall memory value",
  },
  {
    type: "clear",
    label: "MC",
    icon: Trash2,
    description: "Clear memory",
  },
];
