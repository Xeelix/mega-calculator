import { create } from "zustand";
import { calculatorService, CalculatorState, CalculationDto } from "@/lib/api";
import { toast } from "sonner";
import { persist } from "zustand/middleware";
import debounce from "lodash.debounce";

interface CalculatorStore extends CalculatorState {
  isLoading: boolean;
  error: string | null;
  showHistory: boolean;
  fetchState: () => Promise<void>;
  updateState: () => Promise<void>;
  calculate: (expression: string) => Promise<void>;
  setCurrentExpression: (expression: string) => void;
  setMemory: (value: number) => void;
  clearMemory: () => void;
  clearCurrentExpression: () => void;
  clearHistory: () => Promise<void>;
  toggleShowHistory: () => void;
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set, get) => {
      // Create a debounced function for updating state
      const debouncedUpdate = debounce(async () => {
        const { memory, currentExpression } = get();
        try {
          await calculatorService.updateState({ memory, currentExpression });
        } catch (error) {
          toast.error("Failed to update calculator state");
        }
      }, 500);

      return {
        memory: 0,
        currentExpression: "",
        history: [],
        isLoading: false,
        error: null,
        showHistory: false,

        fetchState: async () => {
          set({ isLoading: true, error: null });
          try {
            const state = await calculatorService.getState();
            set({ ...state, isLoading: false });
          } catch (error) {
            set({
              isLoading: false,
              error: "Failed to fetch calculator state",
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
            // Perform calculation in the frontend
            // eslint-disable-next-line no-new-func
            const calculatedResult = new Function(`return ${expression}`)();
            const result = parseFloat(calculatedResult.toFixed(10));

            // Create calculation object
            const newCalculation = {
              expression,
              result,
              timestamp: new Date().toISOString(),
            };

            // Save calculation to backend
            let updatedState;
            try {
              updatedState = await calculatorService.saveCalculation({
                expression,
                result,
              });
            } catch (error) {
              console.error(
                "Failed to save calculation to server, continuing with local update only"
              );
              // Continue with local update only if server save fails
              updatedState = null;
            }

            // If we got an updated state from the server, use it, otherwise update locally
            if (updatedState) {
              set({
                ...updatedState,
                isLoading: false,
              });
            } else {
              // Add the new calculation to history
              const newHistory = [...get().history, newCalculation];

              // Update state with new calculation
              set({
                history: newHistory,
                currentExpression: result.toString(),
                isLoading: false,
              });
            }
          } catch (error) {
            console.error(error);
            set({
              isLoading: false,
              error: "Failed to perform calculation",
            });
            toast.error("Failed to perform calculation");
          }
        },

        setCurrentExpression: (expression: string) => {
          set({ currentExpression: expression });
          // Trigger the debounced update instead of immediate update
          debouncedUpdate();
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
          set({ currentExpression: "0" });
        },

        clearHistory: async () => {
          set({ isLoading: true });
          try {
            const updatedState = await calculatorService.clearHistory();
            set({
              ...updatedState,
              isLoading: false,
            });
            toast.info("History cleared");
          } catch (error) {
            console.error("Failed to clear history:", error);
            set({ isLoading: false });
            toast.error("Failed to clear history");
          }
        },

        toggleShowHistory: () => {
          set((state) => ({ showHistory: !state.showHistory }));
        },
      };
    },
    {
      name: "calculator-storage",
    }
  )
);
