"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCalculatorStore } from "@/store/calculator-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { CalculationDto } from "@/lib/api";
import { Calculator, LogOut, History } from "lucide-react";

export default function CalculatorPage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { 
    currentExpression, 
    memory, 
    history, 
    fetchState,
    isLoading
  } = useCalculatorStore();

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">Mega Calculator</h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      {isLoading ? (
        <div className="w-full max-w-md p-8 text-center">Loading calculator...</div>
      ) : (
        <div className="w-full max-w-md">
          <div className="p-4 border rounded-md mb-4">
            <p>Current Expression: {currentExpression || "0"}</p>
            <p>Memory: {memory}</p>
          </div>
          
          <div className="rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm shadow-sm p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">History</h2>
              </div>
              {history.length > 0 && (
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  Clear
                </Button>
              )}
            </div>
            
            {history.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No calculations yet</p>
            ) : (
              <ul className="space-y-3">
                {history.map((calc: CalculationDto, index: number) => (
                  <li 
                    key={index} 
                    className="px-4 py-3 rounded-md bg-background/50 hover:bg-accent/70 transition-colors flex justify-between items-center"
                  >
                    <span className="text-muted-foreground">{calc.expression}</span>
                    <span className="font-medium">{calc.result}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 