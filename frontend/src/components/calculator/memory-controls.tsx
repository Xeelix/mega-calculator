"use client";

import { Button } from "@/components/ui/button";

interface MemoryControlsProps {
  handleMemoryAdd: () => void;
  handleMemorySubtract: () => void;
  handleMemoryRecall: () => void;
  clearMemory: () => void;
}

export function MemoryControls({
  handleMemoryAdd,
  handleMemorySubtract,
  handleMemoryRecall,
  clearMemory,
}: MemoryControlsProps) {
  return (
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
  );
} 