"use client";

import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { motion } from "framer-motion";

interface HistoryToggleButtonProps {
  showHistory: boolean;
  toggleShowHistory: () => void;
}

export function HistoryToggleButton({
  showHistory,
  toggleShowHistory,
}: HistoryToggleButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleShowHistory}
      aria-label="Toggle history"
      className="relative overflow-hidden group"
    >
      <motion.div
        animate={{
          rotate: showHistory ? 360 : 0,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
        }}
      >
        <History className="h-4 w-4" />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-primary/10 dark:bg-primary/5 rounded-sm"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </Button>
  );
}
