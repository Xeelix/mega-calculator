"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

interface DemoAccountButtonProps {
  username: string;
  password: string;
}

export function DemoAccountButton({
  username,
  password,
}: DemoAccountButtonProps) {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = async () => {
    const success = await login({ username, password });
    if (success) {
      router.push("/calculator");
    }
  };

  return (
    <div className="px-4 py-3 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium">{username}</p>
        <p className="text-xs text-muted-foreground">{password}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 text-xs"
        onClick={handleLogin}
      >
        <LogIn className="h-3 w-3 mr-1" />
        Login
      </Button>
    </div>
  );
}
