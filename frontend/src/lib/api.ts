import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get token - will be set after auth store is initialized
let getToken: () => string | null = () => null;

// Export a function to set the token getter
export const setTokenGetter = (getter: () => string | null) => {
  getToken = getter;
};

// Add request interceptor to include the token in requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to handle token expiration - will be set after auth store is initialized
let handleTokenExpiration: () => void;

// Export a function to set the token expiration handler
export const setTokenExpirationHandler = (handler: () => void) => {
  handleTokenExpiration = handler;
};

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && getToken()) {
      if (handleTokenExpiration) {
        handleTokenExpiration();
      }
    }
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface CalculationDto {
  expression: string;
  result: number;
  timestamp: string;
}

export interface CalculatorState {
  memory: number;
  currentExpression: string;
  history: CalculationDto[];
}

export interface CalculateRequest {
  expression: string;
  result: number;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },
};

export const calculatorService = {
  getState: async (): Promise<CalculatorState> => {
    const response = await api.get<CalculatorState>("/calculator/state");
    return response.data;
  },

  updateState: async (
    state: Omit<CalculatorState, "history">
  ): Promise<void> => {
    await api.post("/calculator/state", state);
  },

  saveCalculation: async (
    calculation: CalculateRequest
  ): Promise<CalculatorState> => {
    const response = await api.post<CalculatorState>(
      "/calculator/save-calculation",
      calculation
    );
    return response.data;
  },

  clearHistory: async (): Promise<CalculatorState> => {
    const response = await api.delete<CalculatorState>("/calculator/history");
    return response.data;
  },
};

export default api;
