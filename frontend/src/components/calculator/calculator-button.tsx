"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonType = "number" | "operator" | "function" | "equals";

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  type?: ButtonType;
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
  colSpan?: 1 | 2;
}

export function CalculatorButton({
  value,
  onClick,
  type = "number",
  icon: Icon,
  className,
  children,
  colSpan = 1,
}: CalculatorButtonProps) {
  const getVariant = () => {
    switch (type) {
      case "number":
        return "default";
      case "operator":
        return "secondary";
      case "function":
        return "outline";
      case "equals":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Button
      variant={getVariant()}
      onClick={onClick}
      className={cn(
        colSpan === 2 && "col-span-2",
        type === "equals" && "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : children || value}
    </Button>
  );
} 