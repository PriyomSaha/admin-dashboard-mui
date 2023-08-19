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
  userData: { userId: "", userName: "", userToken: "", authStatus: false },
  setUserData: (userId, userName, userToken, authStatus) =>
    set((state) => ({ userData: { userId, userName, userToken, authStatus } })),
}));

export const useEditProfileStore = create((set) => ({
  isEditProfile: false,
  setIsEditProfile: () =>
    set((state) => ({ isEditProfile: !state.isEditProfile })),
}));
