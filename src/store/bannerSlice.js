import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    isLoadingBanners: true,
    banners: [],
    activeBanner: {},
    createBanner: false,
    deleteBanner: false,
  },
  reducers: {    
    onSetActiveBanner: (state, { payload }) => {
      state.activeBanner = payload || {};
    },
    toggleCreateBannerMode: (state) => {
        // console.log("Previous createBanner:", state.createBanner); // Debug
        state.createBanner = !state.createBanner;
        // console.log("Updated createBanner:", state.createBanner);
    },
    toggleDeletingBannerMode: (state) => {
      // console.log("Previous DeletingBannerMode:", state.deleteBanner); // Debug
      state.deleteBanner = !state.deleteBanner;
      // console.log("Updated DeletingBannerMode:", state.deleteBanner);
    },
    onAddNewBanner: (state, { payload }) => {
      state.banners.push(payload);
      state.activeBanner = {};
    },
    onUpdateBanner: (state, { payload }) => {
      state.banners = state.banners.map((banner) => {
        if (banner.id === payload.id) {
          return payload;
        }
        return banner;
      });
    },
    onDeleteBanner: (state) => {
      if (state.activeBanner) {
        state.banners = state.banners.filter(
          (banner) => banner.id !== state.activeBanner.id
        );
        // console.log(state.banners[0])
        state.activeBanner = {};
      }
    },
    onLoadBanners: (state, { payload = [] }) => {
      state.isLoadingBanners = false;
      payload.forEach(banner => {
        const exists = state.banners.some(dbBanner => dbBanner.id === banner.id);
        if (!exists) {
          state.banners.push(banner);
        }
      });
    },
    onLogoutBanners: (state) => {
      (state.isLoadingBanners = true),
        (state.banners = []),
        (state.activeBanner = {});
    },
  },
});

export const {
    onSetActiveBanner,
    onAddNewBanner,
    onUpdateBanner,
    onDeleteBanner,
    onLoadBanners,
    onLogoutBanners,
    toggleCreateBannerMode,
    toggleDeletingBannerMode,
} = bannerSlice.actions