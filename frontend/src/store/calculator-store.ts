import { create } from "zustand";
import { calculatorService, CalculatorState, CalculationDto } from "@/lib/api";
import { toast } from "sonner";

interface CalculatorStore extends CalculatorState {
  isLoading: boolean;
  error: string | null;
  fetchState: () => Promise<void>;
  updateState: () => Promise<void>;
  calculate: (expression: string) => Promise<void>;
  setCurrentExpression: (expression: string) => void;
  setMemory: (value: number) => void;
  clearMemory: () => void;
  clearCurrentExpression: () => void;
  clearHistory: () => void;
}

export const useCalculatorStore = create<CalculatorStore>((set, get) => ({
  memory: 0,
  currentExpression: "",
  history: [],
  isLoading: false,
  error: null,

  fetchState: async () => {
    set({ isLoading: true, error: null });
    try {
      const state = await calculatorService.getState();
      set({ ...state, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: "Failed to fetch calculator state" 
      });
      toast.error("Failed to fetch calculator state");
    }
  },

  updateState: async () => {
    const { memory, currentExpression } = get();
    try {
      await calculatorService.updateState({ memory, currentExpression });
    } catch (error) {
      toast.error("Failed to update calculator state");
    }
  },

  calculate: async (expression: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await calculatorService.calculate({ expression });
      
      // Add the new calculation to history
      const newHistory = [...get().history, result];
      
      // Update state with new calculation
      set({
        history: newHistory,
        currentExpression: result && result.result !== undefined ? result.result.toString() : "0",
        isLoading: false,
      });
      
      // Save the updated state
      await get().updateState();
    } catch (error) {
      console.error(error);
      set({ 
        isLoading: false, 
        error: "Failed to perform calculation" 
      });
      toast.error("Failed to perform calculation");
    }
  },

  setCurrentExpression: (expression: string) => {
    set({ currentExpression: expression });
  },

  setMemory: (value: number) => {
    set({ memory: value });
    get().updateState();
    toast.success("Value saved to memory");
  },

  clearMemory: () => {
    set({ memory: 0 });
    get().updateState();
    toast.info("Memory cleared");
  },

  clearCurrentExpression: () => {
    set({ currentExpression: "" });
  },

  clearHistory: () => {
    set({ history: [] });
    get().updateState();
    toast.info("History cleared");
  }
}));
