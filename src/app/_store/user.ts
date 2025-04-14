import { create } from "zustand";

const useUserStore = create((set) => ({
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
  updateUser: (newUerInfo: any) => set({ user: { ...newUerInfo } }),
}));

export default useUserStore;
