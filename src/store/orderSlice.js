import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoadingOrders: true,
    orderProducts: [],
    activeOrder: null,
  },
  reducers: {
    onSetActiveOrder: (state, { payload }) => {
      state.activeOrder = payload;
    },
    onAddNewOrder: (state, { payload }) => {
      state.orders.push(payload);
      state.activeOrder = null;
    },
    onUpdateOrder: (state, { payload }) => {
      state.orders = state.orders.map((order) => {
        if (order.id === payload.id) {
          return payload;
        }
        return order;
      });
    },
    onDeleteOrder: (state) => {
      if (state.activeOrder) {
        state.orders = state.orders.filter(
          (order) => order.id !== state.activeOrder.id
        );
        // console.log(state.courses[0])
        state.activeOrder = null;
      }
    },
    onLoadOrders: (state, { payload = [] }) => {
      // state.activeCourse = null;
      state.isLoadingOrders = false;
      payload.forEach((order) => {
        const exists = state.orders.some(
          (dbOrder) => dbOrder.id === order.id
        );
        if (!exists) {
          state.orders.push(order);
        }
      });
    },
    onLogoutOrders: (state) => {
      (state.isLoadingOrders = true),
        (state.orders = []),
        (state.activeOrder = null);
    },
  },
});

export const {
    onSetActiveOrder,
    onAddNewOrder,
    onUpdateOrder,
    onDeleteOrder,
    onLoadOrders,
    onLogoutOrders
} = orderSlice.actions