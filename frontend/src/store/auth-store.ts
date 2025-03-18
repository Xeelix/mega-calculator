import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, LoginCredentials } from "@/lib/api";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  handleTokenExpired: () => void;
  getToken: () => string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Get token from state
      getToken: () => {
        return get().token;
      },
      
      // Set token in state and storage
      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
        // Set cookie for middleware (7 days expiry)
        Cookies.set("token", token, { path: "/", expires: 1, sameSite: "Strict" });
      },
      
      // Remove token from state and storage
      removeToken: () => {
        set({ token: null, isAuthenticated: false });
        // Remove cookie
        Cookies.remove("token", { path: "/" });
      },
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          // Use the setToken method
          get().setToken(response.access_token);
          set({ isLoading: false });
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
        // Use the removeToken method
        get().removeToken();
      },
      
      handleTokenExpired: () => {
        // Use the removeToken method
        get().removeToken();
        set({ error: "Session expired. Please login again." });
        // Show toast notification
        toast.error("Your session has expired. Please login again.");
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
