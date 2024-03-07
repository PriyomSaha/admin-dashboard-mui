import { create } from "zustand";

export const useDrawerStore = create((set) => ({
  isDrawerOpen: false,
  setDrawerOpen: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export const useSnackbarStore = create((set) => ({
  showSnackbar: false,
  setShowSnackbar: () =>
    set((state) => ({ showSnackbar: !state.showSnackbar })),
  snackbarMessage: "",
  setSnackbarMessage: (value) =>
    set((state) => ({
      snackbarMessage: value,
    })),
  snackbarType: "info",
  setSnackbarType: (value) =>
    set((state) => ({
      snackbarType: value,
    })),
}));

export const useInvitedUserStore = create((set) => ({
  isInvitedUsersLoading: false,
  setIsInvitedUsersLoading: () =>
    set((state) => ({ isInvitedUsersLoading: !state.isInvitedUsersLoading })),
  allInvitedUsers: [],
  setAllInvitedUsers: (invitedUsers) =>
    set({
      allInvitedUsers: invitedUsers,
    }),

  // Array to hold selected permissions
  invitedUserType: "", //Modal Type
  setInvitedUserType: (value) =>
    set(() => ({
      invitedUserType: value,
    })),
  isInvitedUserModalOpen: false,
  setIsInvitedUserModalOpen: () =>
    set((state) => ({
      isInvitedUserModalOpen: !state.isInvitedUserModalOpen,
      invitedUserType: state.isInvitedUserModalOpen
        ? ""
        : state.invitedUserType,
    })),
}));

export const useAccountStore = create((set) => ({
  userData: {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    permissions: [],
    role: "",
    authStatus: false,
  },
  setUserData: (
    userName,
    firstName,
    lastName,
    email,
    permissions,
    role,
    authStatus
  ) =>
    set((state) => ({
      userData: {
        userName,
        firstName,
        lastName,
        email,
        permissions,
        role,
        authStatus,
      },
    })),
}));

export const useEditProfileStore = create((set) => ({
  isEditProfile: false,
  setIsEditProfile: () =>
    set((state) => ({ isEditProfile: !state.isEditProfile })),
}));

// TODO: Merge useCustomersStore useCustomersLoadingStore
export const useCustomersStore = create((set) => ({
  isCustomersLoading: false,
  setIsCustomersLoading: () =>
    set((state) => ({ isCustomersLoading: !state.isCustomersLoading })),
  allCustomersList: [],
  customersList: [],
  setInitialCustomersList: (customers) =>
    set({
      customersList: customers,
      allCustomersList: customers,
    }),
  setFilteredCustomersList: (condition) => {
    if (condition === "All") {
      set((state) => ({
        customersList: state.allCustomersList,
      }));
    } else {
      set((state) => ({
        customersList: state.allCustomersList.filter(
          (customer) => customer.status === condition
        ),
      }));
    }
  },
}));
export const useCustomersLoadingStore = create((set) => ({
  isCustomersLoading: false,
  setIsCustomersLoading: () =>
    set((state) => ({ isCustomersLoading: !state.isCustomersLoading })),
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

export const useMerchantStore = create((set) => ({
  isMerchantsLoading: false,
  setIsMerchantsLoading: () =>
    set((state) => ({ isMerchantsLoading: !state.isMerchantsLoading })),
  allMerchants: [],
  setAllMerchants: (merchants) =>
    set({
      allMerchants: merchants,
    }),
  isMerchantModalOpen: false,
  merchantType: "", //Modal Type
  setMerchantType: (value) =>
    set(() => ({
      merchantType: value,
    })),
  setIsMerchantModalOpen: () =>
    set((state) => ({
      isMerchantModalOpen: !state.isMerchantModalOpen,
      merchantType: state.isMerchantModalOpen ? "" : state.merchantType,
    })),
}));

export const useCategoryStore = create((set) => ({
  isCategoriesLoading: false,
  setIsCategoriesLoading: () =>
    set((state) => ({ isCategoriesLoading: !state.isCategoriesLoading })),
  allCategories: [],
  setAllCategories: (categories) =>
    set({
      allCategories: categories,
    }),
  isCategoryModalOpen: false,
  categoryType: "", //Modal Type
  setCategoryType: (value) =>
    set(() => ({
      categoryType: value,
    })),
  setIsCategoryModalOpen: () =>
    set((state) => ({
      isCategoryModalOpen: !state.isCategoryModalOpen,
      categoryType: state.isCategoryModalOpen ? "" : state.categoryType,
    })),
}));

export const useProductStore = create((set) => ({
  isProductsLoading: false,
  setIsProductsLoading: () =>
    set((state) => ({ isProductsLoading: !state.isProductsLoading })),
  allProducts: [],
  setAllProducts: (products) =>
    set({
      allProducts: products,
    }),
  isProductModalOpen: false,
  productType: "", //Modal Type
  setProductType: (value) =>
    set(() => ({
      productType: value,
    })),
  setIsProductModalOpen: () =>
    set((state) => ({
      isProductModalOpen: !state.isProductModalOpen,
      productType: state.isProductModalOpen ? "" : state.productType,
    })),
}));

export const useBannerStore = create((set) => ({
  isBannerModalOpen: false,
  bannerType: "", //Modal Type
  setBannerType: (value) =>
    set(() => ({
      bannerType: value,
    })),
  setIsBannerModalOpen: () =>
    set((state) => ({
      isBannerModalOpen: !state.isBannerModalOpen,
      bannerType: state.isBannerModalOpen ? "" : state.bannerType,
    })),
}));

export const useCouponStore = create((set) => ({
  isCouponModalOpen: false,
  couponType: "", //Modal Type
  setCouponType: (value) =>
    set(() => ({
      couponType: value,
    })),
  setIsCouponModalOpen: () =>
    set((state) => ({
      isCouponModalOpen: !state.isCouponModalOpen,
      couponType: state.isCouponModalOpen ? "" : state.couponType,
    })),
}));

export const usePopupStore = create((set) => ({
  isPopupModalOpen: false,
  popupType: "", //Modal Type
  setPopupType: (value) =>
    set(() => ({
      popupType: value,
    })),
  setIsPopupModalOpen: () =>
    set((state) => ({
      isPopupModalOpen: !state.isPopupModalOpen,
      popupType: state.isPopupModalOpen ? "" : state.popupType,
    })),
}));
