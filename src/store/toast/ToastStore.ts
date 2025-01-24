import { create } from "zustand";

interface ToastState {
  message: string;
  show: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  show: false,
  showToast: (message: string) => {
    set({ message, show: true });
    setTimeout(() => {
      set({ show: false });
    }, 4000);
  },
  hideToast: () => set({ show: false }),
}));
