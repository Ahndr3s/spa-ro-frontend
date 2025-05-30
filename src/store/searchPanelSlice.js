import { createSlice } from "@reduxjs/toolkit";

export const searchPanelSlice = createSlice({
  name: "searchPanel",
  initialState: { isVisible: false },
  reducers: {
    toggleSearchPanel: (state) => {
      state.isVisible = !state.isVisible;
      console.log("SearchPanel es visble? ", state.isVisible);
    },
  },
});

export const { toggleSearchPanel } = searchPanelSlice.actions;
