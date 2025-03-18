"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { DemoAccountButton } from "./demo-account-button";

export interface DemoAccount {
  username: string;
  password: string;
}

interface DemoAccountsProps {
  accounts: DemoAccount[];
}

export function DemoAccounts({ accounts }: DemoAccountsProps) {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="mt-4">
      <Button
        variant="ghost"
        className="w-full text-sm"
        onClick={() => setShowDemo(!showDemo)}
      >
        <Info className="h-4 w-4 mr-2" />
        {showDemo ? "Hide Demo Accounts" : "Show Demo Accounts"}
      </Button>
      
      {showDemo && (
        <div className="mt-4 rounded-lg overflow-hidden border border-border">
          <div className="bg-muted px-4 py-2 border-b border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Demo Accounts</p>
          </div>
          <div className="divide-y divide-border">
            {accounts.map((account, index) => (
              <DemoAccountButton
                key={index}
                username={account.username}
                password={account.password}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 