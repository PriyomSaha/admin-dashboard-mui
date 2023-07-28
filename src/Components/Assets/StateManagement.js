import { create } from "zustand";

export const useDrawerStore = create((set) => ({
  isDrawerOpen: false,
  setDrawerOpen: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export const useOrdersLoadingStore = create((set) => ({
  isOrderLoading: false,
  setIsOrderLoading: () =>
    set((state) => ({ isOrderLoading: !state.isOrderLoading })),
}));

export const useAccountStore = create((set) => ({
  userData: { userId: "", userName: "" },
  setUserData: (userId, userName) =>
    set((state) => ({ userData: { userId, userName } })),
}));
