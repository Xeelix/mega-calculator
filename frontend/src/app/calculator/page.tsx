"use client";

import { useEffect } from "react";
import { useCalculatorStore } from "@/store/calculator-store";
import { Calculator } from "@/components/calculator";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CalculatorPage() {
  const { fetchState, isLoading, error } = useCalculatorStore();
  const { logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchState().catch((err) => {
      // Error handling is now managed by the interceptor
      // 401 errors will be handled automatically
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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1">
        <Calculator />
      </div>
      <Toaster />
    </div>
  );
} 