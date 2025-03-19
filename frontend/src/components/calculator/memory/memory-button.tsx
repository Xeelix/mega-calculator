"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export type MemoryActionType = "add" | "subtract" | "recall" | "clear";

interface MemoryButtonProps {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
  actionType?: MemoryActionType;
}

export function MemoryButton({
  label,
  onClick,
  icon: Icon,
  className,
  children,
  actionType,
}: MemoryButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn(
        "text-xs",
        actionType === "clear" && "hover:bg-destructive/10",
        className
      )}
    >
      {Icon ? <Icon className="h-3 w-3 mr-1" /> : null}
      {children || label}
    </Button>
  );
}
