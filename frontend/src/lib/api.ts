import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include the token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// We'll set this after the auth store is defined
let handleTokenExpiration: () => void;

// Export a function to set the token expiration handler
export const setTokenExpirationHandler = (handler: () => void) => {
  handleTokenExpiration = handler;
};

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Call the token expiration handler if it's set
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

  updateState: async (state: Omit<CalculatorState, "history">): Promise<void> => {
    await api.post("/calculator/state", state);
  },

  calculate: async (request: CalculateRequest): Promise<CalculationDto> => {
    const response = await api.post<CalculationDto>("/calculator/calculate", request);
    return response.data;
  },
};

export default api; 