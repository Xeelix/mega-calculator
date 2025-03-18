"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Calculator } from "lucide-react";
import { LoginForm, LoginFormValues } from "@/components/login/login-form";
import { DemoAccounts, DemoAccount } from "@/components/login/demo-accounts";

const DEMO_ACCOUNTS: DemoAccount[] = [
  { username: "testuser1", password: "testpass1" },
  { username: "testuser2", password: "testpass2" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  
  const handleSubmit = async (data: LoginFormValues) => {
    const success = await login(data);
    if (success) {
      router.push("/calculator");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <Calculator className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Mega Calculator</CardTitle>
          <CardDescription className="text-center">
            Login to access your calculator
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <LoginForm 
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error || undefined}
          />
          
          <DemoAccounts accounts={DEMO_ACCOUNTS} />
        </CardContent>
      </Card>
    </div>
  );
} 