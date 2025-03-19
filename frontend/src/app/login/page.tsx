"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { LoginForm, LoginFormValues } from "@/components/login/login-form";
import { DemoAccounts, DemoAccount } from "@/components/login/demo-accounts";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen bg-background p-4"
    >
      <div className="absolute top-4 left-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 backdrop-blur-sm shadow-md dark:shadow-lg overflow-hidden">
          <CardHeader className="pb-1">
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 300,
              }}
            >
              <div className="p-2">
                <Calculator className="h-10 w-10 text-primary" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl text-center">
              Mega Calculator
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Login to access your calculator
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-8 px-6 bg-card/95">
            <LoginForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error || undefined}
            />

            <DemoAccounts accounts={DEMO_ACCOUNTS} />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
