import { access } from "fs";
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {
    id: "",
    name: "",
    profile: "",
  },
  token: {
    refreshToken: "",
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
  updateRefreshToken: (newToken: string) =>
    set({
      token: {
        refreshToken: newToken,
      },
    }),
}));

export default useUserStore;
