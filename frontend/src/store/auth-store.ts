import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, LoginCredentials } from "@/lib/api";
import { toast } from "sonner";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          set({
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          // Setting in localStorage for API requests
          localStorage.setItem("token", response.access_token);
          
          return true;
        } catch (error) {
          const errorMessage = "Invalid credentials";
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            token: null,
          });
          toast.error(errorMessage);
          return false;
        }
      },
      logout: () => {
        set({
          token: null,
          isAuthenticated: false,
        });
        
        // Clear from localStorage
        localStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
