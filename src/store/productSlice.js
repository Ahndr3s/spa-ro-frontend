import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoadingProducts: true,
    products: [],
    activeProduct: {},
    createProduct: false,
    deleteProduct: false,
  },
  reducers: {
    onSetActiveProduct: (state, { payload }) => {
      state.activeProduct = payload || {};
    },
    toggleCreativeProdMode: (state) => {
      console.log("Previous createProduct:", state.createProduct); // Debug
      state.createProduct = !state.createProduct;
      console.log("Updated createProduct:", state.createProduct);
    },
    toggleDeletingProdMode: (state) => {
      console.log("Previous DeletingProdMode:", state.deleteProduct); // Debug
      state.deleteProduct = !state.deleteProduct;
      console.log("Updated DeletingProdMode:", state.deleteProduct);
    },
    onAddNewProduct: (state, { payload }) => {
      state.products.push(payload);
      state.activeProduct = {};
    },
    onUpdateProduct: (state, { payload }) => {
      state.products = state.products.map((product) => {
        if (product.id === payload.id) {
          return payload;
        }
        return product;
      });
    },
    onUpdateCostumeSize: (state, { payload }) => {
      if (state.activeProduct) {
        state.activeProduct.size = payload; // Modifica solo la propiedad size
      }
    },    
    onDeleteProduct: (state) => {
      if (state.activeProduct) {
        state.products = state.products.filter(
          (product) => product.id !== state.activeProduct.id
        );
        // console.log(state.courses[0])
        state.activeProduct = {};
      }
    },
    onLoadProducts: (state, {payload = []}) => {
      // state.activeCourse = null;
      state.isLoadingProducts = false
      payload.forEach(product => {
        const exists = state.products.some(dbProduct => dbProduct.id === product.id)
        if(!exists){
          state.products.push(product)
        }
      });
    },
    onLogoutProducts: (state) => {
        state.isLoadingProducts = true,
        state.products = [],
        state.activeProduct = {}
    },
  },
});


// Action creators are generated for each case reducer function
export const {
  onSetActiveProduct,
  onAddNewProduct,
  onUpdateProduct,
  onUpdateCostumeSize,
  onDeleteProduct,
  onLoadProducts,
  onLogoutProducts,
  toggleCreativeProdMode,
  toggleDeletingProdMode,
} = productSlice.actions;
