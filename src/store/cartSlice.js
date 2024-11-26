import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "costumeOnCart",
  initialState: {
    isLoadingCostumesOnCart: true,
    cartCostumes: [],
    activeCostumeOnCart: null,
  },
  reducers: {
    onSetActiveCostumeOnCart: (state, { payload }) => {
      state.activeCostumeOnCart = payload;
    },
    onAddNewCostumeOnCart: (state, { payload }) => {
      state.cartCostumes.push({...payload, qty:1});
      state.activeCostumeOnCart = null;
    },
    onUpdateCostumeOnCart: (state, { payload }) => {
      state.cartCostumes = state.cartCostumes.map((costumeOnCart) => {
        if (costumeOnCart.id === payload.id) {
          return payload;
        }
        return costumeOnCart;
      });
    },
    onUpdateQtyCostumeOnCart: (state, action) => {
      const { id, qty } = action.payload;
      const product = state.cartCostumes.find((item) => item.id === id);
      if (product) {
        product.qty = qty;
      }
    },
    onDeleteCostumeOnCart: (state) => {
        state.cartCostumes = state.cartCostumes.filter(
          (costumeOnCart) => costumeOnCart.id !== state.activeCostumeOnCart.id
        );
        state.activeCostumeOnCart = null;
      
    },
    onLoadCostumesOnCart: (state, { payload = [] }) => {
      // state.activeCourse = null;
      state.isLoadingCostumesOnCart = false;
      payload.forEach((costumeOnCart) => {
        const exists = state.cartCostumes.some(
          (dbCostume) => dbCostume.id === costumeOnCart.id
        );
        if (!exists) {
          state.cartCostumes.push(costumeOnCart);
        }
      });
    },
    onLogoutCostumesOnCart: (state) => {
      (state.isLoadingCostumesOnCart = true),
        (state.cartCostumes = []),
        (state.activeCostumeOnCart = null);
    },
  },
});

export const {
  onSetActiveCostumeOnCart,
  onAddNewCostumeOnCart,
  onUpdateCostumeOnCart,
  onUpdateQtyCostumeOnCart,
  onDeleteCostumeOnCart,
  onLoadCostumesOnCart,
  onLogoutCostumesOnCart,
} = cartSlice.actions;
