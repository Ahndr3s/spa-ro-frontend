import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./authSlice";
import { costumeSlice } from "./costumeSlice";
import { orderSlice } from "./orderSlice";
import { cartSlice } from './cartSlice';
import { sidePanelSlice } from './SidePanelSlice';


export default configureStore({
    reducer: {
      auth: authSlice.reducer,
      costume: costumeSlice.reducer,
      order: orderSlice.reducer,
      costumeOnCart: cartSlice.reducer,
      sidePanel: sidePanelSlice.reducer,
    },
  })