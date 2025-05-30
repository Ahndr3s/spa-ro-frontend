import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "productOnCart",
  initialState: {
    isLoadingProductsOnCart: true,
    cartProducts: [],
    activeProductOnCart: {},
    totalQty: [],
    productsQty: 0,
  },
  reducers: {
    onSetActiveProductOnCart: (state, { payload }) => {
      state.activeProductOnCart = payload;
    },
    onAddNewProductOnCart: (state, { payload }) => {
      state.cartProducts.push({...payload, qty:1});
      state.activeProductOnCart = {};
    },
    onUpdateProductOnCart: (state, { payload }) => {
      state.cartProducts = state.cartProducts.map((productOnCart) => {
        if (productOnCart.id === payload.id) {
          // return payload;
          return {
            ...productOnCart,
            qty: productOnCart.qty + 1,
          };
        }
        return productOnCart;
      });
    },
    onUpdateQtyProductsOnCart: (state, action) => {
      const { id, qty } = action.payload;
      const product = state.cartProducts.find((item) => item.id === id);
      if (product) {
        product.qty = qty;
      }
    },
    onDeleteProductOnCart: (state) => {
        state.cartProducts = state.cartProducts.filter(
          (productOnCart) => productOnCart.id !== state.activeProductOnCart.id
        );
        state.activeProductOnCart = {};
    },
    onLoadProductsOnCart: (state, { payload = [] }) => {
      // state.activeCourse = null;
      state.isLoadingProductsOnCart = false;
      payload.forEach((productOnCart) => {
        const exists = state.cartProducts.some(
          (dbCostume) => dbCostume.id === productOnCart.id
        );
        if (!exists) {
          state.cartProducts.push(productOnCart);
        }
      });
    },
    onLogoutProductsOnCart: (state) => {
      (state.isLoadingProductsOnCart = true),
        (state.cartProducts = []),
        (state.activeProductOnCart = {});
    },
    onUpdateProductQty: (state) => {
      state.totalQty = state.cartProducts.map(objeto => objeto.qty);
      // console.log(state.totalQty.reduce((summary, actualNumber) => summary + actualNumber, 0))
      state.productsQty = state.totalQty.reduce((summary, actualNumber) => summary + actualNumber, 0)
    },
  },
});

export const {
  onSetActiveProductOnCart,
  onAddNewProductOnCart,
  onUpdateProductOnCart,
  onUpdateQtyProductsOnCart,
  onDeleteProductOnCart,
  onLoadProductsOnCart,
  onLogoutProductsOnCart,
  onUpdateProductQty,
} = cartSlice.actions;
