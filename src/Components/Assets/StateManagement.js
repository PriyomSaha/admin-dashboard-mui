import { create } from "zustand";

export const useDrawerStore = create((set) => ({
  isDrawerOpen: false,
  setDrawerOpen: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export const useCustomersLoadingStore = create((set) => ({
  isCustomersLoading: false,
  setIsCustomersLoading: () =>
    set((state) => ({ isCustomersLoading: !state.isCustomersLoading })),
}));
export const useAccountStore = create((set) => ({
  userData: { userName: "", authStatus: false },
  setUserData: (userName, authStatus) =>
    set((state) => ({ userData: { userName, authStatus } })),
}));

export const useEditProfileStore = create((set) => ({
  isEditProfile: false,
  setIsEditProfile: () =>
    set((state) => ({ isEditProfile: !state.isEditProfile })),
}));

export const useOrdersStore = create((set) => ({
  isOrderLoading: false,
  setIsOrderLoading: () =>
    set((state) => ({ isOrderLoading: !state.isOrderLoading })),
  allOrdersList: [],
  ordersList: [],
  setInitialOrdersList: (orders) =>
    set({
      ordersList: orders,
      allOrdersList: orders,
    }),
  setFilteredOrdersList: (condition) => {
    if (condition === "All") {
      set((state) => ({
        ordersList: state.allOrdersList,
      }));
    } else {
      set((state) => ({
        ordersList: state.allOrdersList.filter(
          (order) => order.status === condition
        ),
      }));
    }
  },
}));