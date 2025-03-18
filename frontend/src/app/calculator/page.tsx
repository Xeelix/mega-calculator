"use client";

import { useEffect } from "react";
import { useCalculatorStore } from "@/store/calculator-store";
import { Calculator } from "@/components/calculator";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CalculatorPage() {
  const { fetchState, isLoading } = useCalculatorStore();
  const { logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchState();
  }, [fetchState]);

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
        <h1 className="text-3xl font-bold mb-6 text-center">Mega Calculator</h1>
        <Calculator />
      </div>
    </div>
  );
} 