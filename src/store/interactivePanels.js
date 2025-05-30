import { createSlice } from "@reduxjs/toolkit";

export const interactivePanelSlice = createSlice({
    name: 'interactivePanels',
    initialState: {
        sidePanelVisible: false,
        searchPanelVisible: false,
        navbarVisible: false,
      },
      
      reducers: {
        toggleSearchPanel: (state) => {
          state.searchPanelVisible = !state.searchPanelVisible;
          if (state.searchPanelVisible) {
            state.sidePanelVisible = false; // Cerrar SidePanel si se abre SearchPanel
          }
        },
        toggleSidePanel: (state) => {
          state.sidePanelVisible = !state.sidePanelVisible;
          if (state.sidePanelVisible) {
            state.searchPanelVisible = false; // Cerrar SearchPanel si se abre SidePanel
          }
        },
        toggleNavbar: (state) => {
          state.navbarVisible = !state.navbarVisible;
          if (state.navbarVisible) {
            state.sidePanelVisible = false;
            state.searchPanelVisible = false;
          }
        },
      },
})

export const { toggleNavbar, toggleSearchPanel, toggleSidePanel } = interactivePanelSlice.actions