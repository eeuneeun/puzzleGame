import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    id: "",
    name: "",
    profile: "",
  },
  removeAllBears: () =>
    set({
      user: {
        id: "",
        name: "",
        profile: "",
      },
    }),
  updateBears: (newUerInfo: any) => set({ user: newUerInfo }),
}));
