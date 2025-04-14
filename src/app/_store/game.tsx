import { create } from "zustand";

const useGameStore = create((set) => ({
  game: {
    id: "",
    job: "",
  },
  clearAllGameInfo: () =>
    set({
      game: {
        id: "",
        job: "warrior",
      },
    }),
  updateGame: (jobName: string) => set({ game: { job: jobName } }),
}));

export default useGameStore;
