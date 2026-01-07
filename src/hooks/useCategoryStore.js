import { useDispatch, useSelector } from "react-redux";
import {
  onLoadCategories,
  onAddNewCategory,
  onUpdateCategory,
  onDeleteCategory,
  onSetActiveCategory,
} from "../store/categorySlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";

export const useCategoryStore = () => {
  const { categories, activeCategory } = useSelector((state) => state.category);
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

  const setActiveCategory = (category) => {
    dispatch(onSetActiveCategory(category));
  };

  const startSavingCategory = async (category) => {
    // console.log(category)
    try {
      if (!user?.uuid) {
        throw new Error("No user information available");
      }

      if (category.id) {
        // console.log('voy a actualizar una categoria')
        await roApi.put(`/api/categories/${category.id}`, {...category, user: user.uuid,});
        dispatch(onUpdateCategory(category));
        return;
      }
      // console.log('voy a crear una categoria')
      const { data } = await roApi.post(`/api/categories/`, {...category, user: user.uuid,});
      dispatch(onAddNewCategory({ ...category, id: data.category.id, user }));
      // console.log(banner)
    } catch (error) {
      console.log("Error at saving Category ",error);
      Swal.fire("Error", error.response?.data?.msg, "error");
    }
  };

  const startDeletingCategory = async () => {
    try {
      if (!user?.uuid) {
        throw new Error("No user information available");
      }
      await roApi.delete(`api/categories/${activeCategory.id}?user=${user.uuid}`);
      dispatch(onDeleteCategory());
    } catch (error) {
      console.log(error);
      Swal.fire("Error at deleting ", error.response.data.msg, "error");
    }
  };

  const startLoadingCategories = async () => {
    try {
      const { data } = await roApi.get("/api/categories");
      // console.dir(data)
      dispatch(onLoadCategories(data.categories));
    } catch (error) {
      console.log("Error loading banners");
      console.log(error);
    }
  };

  return {
    // PROPERTIES
    activeCategory,
    categories,
    hasCategorySelected: !!activeCategory,

    // METHODS
    setActiveCategory,
    startLoadingCategories,
    startSavingCategory,
    startDeletingCategory,
  };
};
