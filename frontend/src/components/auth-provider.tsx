"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { setTokenExpirationHandler, setTokenGetter } from "@/lib/api";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { token, setToken, handleTokenExpired, getToken } = useAuthStore();
  const router = useRouter();

  // Set up token getter and expiration handler
  useEffect(() => {
    // Set the token getter for API requests
    setTokenGetter(getToken);

    // Set up token expiration handler
    setTokenExpirationHandler(() => {
      handleTokenExpired();
      router.push("/login");
    });
  }, [handleTokenExpired, getToken, router]);

  // Initialize token from localStorage on first load if needed
  useEffect(() => {
    // This is only needed once during initialization
    // to sync any existing token from a previous session
    if (!token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        // Use store method to set token which will also set the cookie
        setToken(storedToken);
        // Remove from localStorage as we'll use the store from now on
        localStorage.removeItem("token");
      }
    }
  }, [token, setToken]);

  return <>{children}</>;
}
