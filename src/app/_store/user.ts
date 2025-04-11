import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    id: "",
    name: "",
    profile: "",
  },
  removeAllUserInfo: () =>
    set({
      user: {
        id: "",
        name: "",
        profile: "",
      },
    }),
  updateBears: (newUerInfo: any) => set({ user: newUerInfo }),
}));
