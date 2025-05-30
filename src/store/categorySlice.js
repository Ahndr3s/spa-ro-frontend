import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoadingcategories: true,
    categories: [],
    activeCategory: {},
    createCategory: false,
    deleteCategory: false,
  },
  reducers: {
    onSetActiveCategory: (state, { payload }) => {
      state.activeCategory = payload || {};
    },
    toggleCreativeCatMode: (state) => {
      console.log("Previous createCategory:", state.createCategory); // Debug
      state.createCategory = !state.createCategory;
      console.log("Updated createCategory:", state.createCategory);
    },
    toggleDeletingCatMode: (state) => {
      console.log("Previous DeletingCatMode:", state.deleteCategory); // Debug
      state.deleteCategory = !state.deleteCategory;
      console.log("Updated DeletingCatMode:", state.deleteCategory);
    },
    onAddNewCategory: (state, { payload }) => {
      state.categories.push(payload);
      state.activeCategory = {};
    },
    onUpdateCategory: (state, { payload }) => {
      state.categories = state.categories.map((category) => {
        if (category.id === payload.id) {
          return payload;
        }
        return category;
      });
    },
    onDeleteCategory: (state) => {
      if (state.activeCategory) {
        state.categories = state.categories.filter(
          (category) => category.id !== state.activeCategory.id
        );
        // console.log(state.courses[0])
        state.activeCategory = {};
      }
    },
    onLoadCategories: (state, {payload = []}) => {
      // state.activeCourse = null;
      state.isLoadingcategories = false
      payload.forEach(category => {
        const exists = state.categories.some(dbCategory => dbCategory.id === category.id)
        if(!exists){
          state.categories.push(category)
        }
      });
    },
    onLogoutCategories: (state) => {
        state.isLoadingcategories = true,
        state.categories = [],
        state.activeCategory = {}
    },
  },
});


// Action creators are generated for each case reducer function
export const {
  onSetActiveCategory,
  onAddNewCategory,
  onUpdateCategory,
  onDeleteCategory,
  onLoadCategories,
  onLogoutCategories,
  toggleCreativeCatMode,
  toggleDeletingCatMode,
} = categorySlice.actions;
