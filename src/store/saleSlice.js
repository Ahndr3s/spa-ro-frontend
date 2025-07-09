import { createSlice } from "@reduxjs/toolkit";

export const saleSlice = createSlice({
  name: "sale",
  initialState: {
    isLoadingSales: true,
    checkSale: false,
    setDate:false,
    sales: [],
    contact: {},
    activeSale: {},
    mostSoldProduct: {},
    mostSoldProductOfTheMonth: {},
  },
  reducers: {
    onSetActiveSale: (state, { payload }) => {
      state.activeSale = payload;
    },
    onCheckingSale: (state) => {
      // console.log("Previous checkSale:", state.checkSale); // Debug
      state.checkSale = !state.checkSale;
      // console.log("Updated checkSale:", state.checkSale);
    },
    onSettiningDate: (state) => {
      // console.log("Previous checkSale:", state.checkSale); // Debug
      state.setDate = !state.setDate;
      // console.log("Updated checkSale:", state.checkSale);
    },
    onCaptureContact: (state, { payload }) => {
      // state.contactStatus = "Captured";
      state.contact = payload;
      state.errorMessage = undefined;
    },
    onAddNewSale: (state, { payload }) => {
      state.sales.push(payload);
      state.activeSale = null;
    },
    onUpdateSale: (state, { payload }) => {
      state.sales = state.sales.map((sale) => {
        if (sale.id === payload.id) {
          return payload;
        }
        return sale;
      });
    },
    onDeleteSale: (state) => {
      if (state.activeSale) {
        state.sales = state.sales.filter(
          (sale) => sale.id !== state.activeSale.id
        );
        // console.log(state.courses[0])
        state.activeSale = null;
      }
    },
    onLoadSales: (state, { payload = [] }) => {
      // state.activeCourse = null;
      state.isLoadingSales = false;
      payload.forEach((sale) => {
        const exists = state.sales.some((dbSale) => dbSale.id === sale.id);
        if (!exists) {
          state.sales.push(sale);
        }
      });
    },
    onSetMostSoldProduct: (state, { payload }) => {
      state.mostSoldProduct = payload;
    },
    onSetMostSoldProductOfTheMonth: (state, { payload }) => {
      state.mostSoldProductOfTheMonth = payload;
    },
    onLogoutSales: (state) => {
      (state.isLoadingOrders = true),
        (state.orders = []),
        (state.activeOrder = null);
    },
  },
});

export const {
  onCheckingSale,
  onSettiningDate,
  onCaptureContact,
  onSetActiveSale,
  onSetMostSoldProduct,
  onAddNewSale,
  onUpdateSale,
  onDeleteSale,
  onLoadSales,
  onLogoutSales,
} = saleSlice.actions;
