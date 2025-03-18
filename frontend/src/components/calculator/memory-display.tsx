"use client";

import { Brain } from "lucide-react";

interface MemoryDisplayProps {
  memory: number;
}

export function MemoryDisplay({ memory }: MemoryDisplayProps) {
  return (
    <div className="flex items-center gap-1 text-xs bg-secondary/50 px-2 py-1 rounded-md">
      <Brain className="h-3 w-3" />
      <span className="font-mono">{memory}</span>
    </div>
  );
} 