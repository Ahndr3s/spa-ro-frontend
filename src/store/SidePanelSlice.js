import { createSlice } from "@reduxjs/toolkit";

export const sidePanelSlice = createSlice({
  name: "sidePanel",
  initialState: { isVisible: false },
  reducers: {
    toggleSidePanel: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleSidePanel } = sidePanelSlice.actions;
