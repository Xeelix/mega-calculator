"use client";

import { MemoryButton, MemoryActionType } from "./memory-button";
import { memoryControlsConfig, MemoryAction } from "./memory-config";

interface MemoryControlsProps {
  handleMemoryAdd: () => void;
  handleMemorySubtract: () => void;
  handleMemoryRecall: () => void;
  clearMemory: () => void;
  config?: MemoryAction[]; // Allow custom configuration
}

export function MemoryControls({
  handleMemoryAdd,
  handleMemorySubtract,
  handleMemoryRecall,
  clearMemory,
  config = memoryControlsConfig,
}: MemoryControlsProps) {
  // Map action types to handler functions
  const actionHandlers: Record<MemoryActionType, () => void> = {
    add: handleMemoryAdd,
    subtract: handleMemorySubtract,
    recall: handleMemoryRecall,
    clear: clearMemory,
  };

  // Get handler for a specific memory action
  const getHandler = (actionType: MemoryActionType): (() => void) => {
    return actionHandlers[actionType];
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {config.map((action, index) => (
        <MemoryButton
          key={`memory-btn-${index}`}
          label={action.label}
          onClick={getHandler(action.type)}
          icon={action.icon}
          actionType={action.type}
          className="group relative"
        />
      ))}
    </div>
  );
} 