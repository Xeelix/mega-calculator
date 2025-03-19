"use client";

import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MemoryDisplayProps {
  memory: number;
  className?: string;
}

export function MemoryDisplay({ memory, className }: MemoryDisplayProps) {
  const hasMemory = memory !== 0;

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors",
        hasMemory ? "bg-secondary/50" : "bg-secondary/20",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{
          scale: hasMemory ? 1.1 : 0.9,
          opacity: hasMemory ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
      >
        <Brain className="h-3 w-3" />
      </motion.div>
      <span className="font-mono">{memory}</span>
    </div>
  );
}
