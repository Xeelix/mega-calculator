"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { token } = useAuthStore();
  
  // We'll use the auth provider for any global auth state management
  // and to synchronize token between localStorage and cookies
  useEffect(() => {
    // On initial load, check if there's a token in localStorage
    const storedToken = localStorage.getItem("token");
    
    // Store the token in a cookie for the middleware to access
    if (token) {
      document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Strict`;
    } else if (storedToken) {
      // If there's a token in localStorage but not in the store,
      // set it in the cookie
      document.cookie = `token=${storedToken}; path=/; max-age=604800; SameSite=Strict`;
    } else {
      // Clear the cookie if no token exists
      document.cookie = "token=; path=/; max-age=0";
    }
  }, [token]);

  return <>{children}</>;
} 