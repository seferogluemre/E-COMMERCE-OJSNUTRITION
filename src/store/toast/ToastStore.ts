import { create } from "zustand";
import { ToastState } from "../../types/ToastTypes";

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  type: "success",
  isVisible: false,
  showToast: (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    set({ message, type, isVisible: true });
    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },
  hideToast: () => set({ isVisible: false }),
}));
