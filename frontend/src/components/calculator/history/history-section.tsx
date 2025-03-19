"use client";

import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalculationDto } from "@/lib/api";

interface HistorySectionProps {
  showHistory: boolean;
  history: CalculationDto[];
  clearHistory: () => void;
  setCurrentExpression: (value: string) => void;
}

export function HistorySection({
  showHistory,
  history,
  clearHistory,
  setCurrentExpression,
}: HistorySectionProps) {
  return (
    <div
      className={cn(
        "block p-0 overflow-hidden transition-all duration-300 w-full",
        showHistory ? "max-h-96" : "max-h-0"
      )}
    >
      <div className="p-4 border-t w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium flex items-center gap-1">
            <History className="h-4 w-4" />
            Calculation History
          </h3>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={clearHistory}
            >
              Clear History
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">
            No calculations yet
          </p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {history.map((calculation: CalculationDto, index: number) => (
              <div
                key={index}
                className="flex flex-col p-3 rounded-md bg-secondary/20 hover:bg-secondary/30 transition-colors text-sm cursor-pointer"
                onClick={() =>
                  setCurrentExpression(calculation.expression.toString())
                }
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-muted-foreground truncate max-w-[80%]">
                    {calculation.expression}
                  </span>
                  <div className="font-medium text-base">
                    {calculation.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
