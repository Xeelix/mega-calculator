"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCalculatorStore } from "@/store/calculator-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { CalculationDto } from "@/lib/api";

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
        <h1 className="text-2xl font-bold">Mega Calculator</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      {isLoading ? (
        <div className="w-full max-w-md p-8 text-center">Loading calculator...</div>
      ) : (
        <div className="w-full max-w-md">
          <div className="p-4 border rounded-md mb-4">
            <p>Current Expression: {currentExpression || "0"}</p>
            <p>Memory: {memory}</p>
          </div>
          
          <div className="p-4 border rounded-md">
            <h2 className="text-lg font-medium mb-2">History</h2>
            {history.length === 0 ? (
              <p>No calculations yet</p>
            ) : (
              <ul className="space-y-2">
                {history.map((calc: CalculationDto, index: number) => (
                  <li key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    {calc.expression} = {calc.result}
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