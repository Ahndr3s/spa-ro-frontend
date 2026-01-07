import { useDispatch, useSelector } from "react-redux";
import {
  onLoadBanners,
  onAddNewBanner,
  onUpdateBanner,
  onDeleteBanner,
  onSetActiveBanner,
} from "../store/bannerSlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";

export const useBannerStore = () => {
  const { banners, activeBanner } = useSelector((state) => state.banner);
  const authState = useSelector((state) => state.auth);
  let user = authState?.user;

  if (!user) {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        user = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }
  }
  const dispatch = useDispatch();

  const setActiveBanner = (banner) => {
    dispatch(onSetActiveBanner(banner));
  };

  const startSavingBanner = async (banner) => {
    try {
      if (!user?.uuid) {
        throw new Error("No user information available");
      }

      if (banner.id) {
        // console.log('Voy a actualizar')
        await roApi.put(`/api/banners/${banner.id}`, {...banner, user: user.uuid,});
        dispatch(onUpdateBanner(banner));
        return;
      }
      // console.log('Voy a crear')
      // console.log(banner);
      const { data } = await roApi.post(`/api/banners/`, {...banner, user: user.uuid,});
      dispatch(onAddNewBanner({ ...banner, id: data.banner.id, user }));
    } catch (error) {
      console.log("Error at saving Banner ", error);
      Swal.fire("Error", error.response?.data?.msg, "error");
    }
  };

  const startDeletingBanner = async () => {
    try {
      if (!user?.uuid) {
        throw new Error("No user information available");
      }
      await roApi.delete(`api/banners/${activeBanner.id}?user=${user.uuid}`);
      dispatch(onDeleteBanner());
    } catch (error) {
      console.log(error);
      Swal.fire("Error at deleting ", error.response.data.msg, "error");
    }
  };

  const startLoadingBanners = async () => {
    try {
      const { data } = await roApi.get("/api/banners");
      dispatch(onLoadBanners(data.banners));
    } catch (error) {
      console.log("Error loading banners");
      console.log(error);
    }
  };

  return {
    // PROPERTIES
    activeBanner,
    banners,
    hasBannerSelected: !!activeBanner,

    // METHODS
    setActiveBanner,
    startLoadingBanners,
    startSavingBanner,
    startDeletingBanner,
  };
};
