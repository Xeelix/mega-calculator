"use client";

import { useEffect } from "react";
import { useCalculatorStore } from "@/store/calculator-store";
import { Calculator } from "@/components/calculator";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion } from "framer-motion";

export default function CalculatorPage() {
  const { fetchState, isLoading, error } = useCalculatorStore();
  const { logout, username } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchState().catch((err) => {
      if (err.response?.status !== 401) {
        toast.error("Failed to load calculator data");
      }
    });
  }, [fetchState]);

  // Show error if the calculator store has an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-screen bg-background p-4"
    >
      <div className="flex justify-between items-center mb-6">
        <ThemeToggle />

        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center bg-secondary/30 dark:bg-secondary/20 px-3 py-1.5 rounded-md border border-border/30"
          >
            <User className="h-3.5 w-3.5 text-secondary-foreground dark:text-secondary-foreground/90 mr-2" />
            <span className="text-xs font-medium text-secondary-foreground dark:text-secondary-foreground/90">
              {username}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-8 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-border/40"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">Logout</span>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <Calculator />
      </div>
      <Toaster />
    </motion.div>
  );
}
