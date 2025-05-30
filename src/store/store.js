import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./authSlice";
import { productSlice } from "./productSlice";
import { bannerSlice } from './bannerSlice';
import { orderSlice } from "./orderSlice";
import { cartSlice } from './cartSlice';
import { categorySlice } from './categorySlice';
import { sidePanelSlice } from './SidePanelSlice';
import { searchPanelSlice } from './searchPanelSlice';
import { interactivePanelSlice } from './interactivePanels';
import { saleSlice } from './saleSlice';


export default configureStore({
    reducer: {
      auth: authSlice.reducer,
      product: productSlice.reducer,
      banner: bannerSlice.reducer,
      order: orderSlice.reducer,
      productOnCart: cartSlice.reducer,
      category: categorySlice.reducer,
      sidePanel: sidePanelSlice.reducer,
      searchPanel: searchPanelSlice.reducer,
      interactivePanels: interactivePanelSlice.reducer,
      sale: saleSlice.reducer,
    },
  })