import { useDispatch, useSelector } from "react-redux";
import {
  onLoadProducts,
  onAddNewProduct,
  onUpdateProduct,
  onDeleteProduct,
  onSetActiveProduct,
} from "../store/productSlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";

export const useProductStore = () => {
  const { products, activeProduct } = useSelector((state) => state.product);
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

  const setActiveProduct = (product) => {
    dispatch(onSetActiveProduct(product));
  };

  const startSavingProduct = async (product) => {
    // console.log(product)
    try {
      if (!user?.uuid) {
        throw new Error("No user information available");
      }

      if (product.id) {
        // console.log('Voy a actualizar un producto')
        // console.log(product)
        await roApi.put(`/api/products/${product.id}`, {...product, user: user.uuid,});
        dispatch(onUpdateProduct(product));
        return;
      }
      // console.log('voy a crear un producto')
      // console.log(product)
      const { data } = await roApi.post(`/api/products/`, {...product, user: user.uuid,});
      dispatch(onAddNewProduct({ ...product, id: data.product.id, user }));
    } catch (error) {
      console.log("Error at saving product",error);
      Swal.fire("Error", error.response?.data?.msg, "error");
      // Swal.fire('Error at saving ', error, 'error')
    }
  };

  const startDeletingProduct = async () => {
    try {
      if (!user?.uuid) {
        throw new Error("No user information available");
      }
      await roApi.delete(`api/products/${activeProduct.id}?user=${user.uuid}`);
      dispatch(onDeleteProduct());
    } catch (error) {
      console.log(error);
      Swal.fire("Error at deleting ", error.response.data.msg, "error");
    }
  };

  const startLoadingProducts = async () => {
    try {
      const { data } = await roApi.get("/api/products");
      // console.dir(data)
      dispatch(onLoadProducts(data.products));
    } catch (error) {
      console.log("Error loading products");
      console.log(error);
    }
  };

  return {
    // PROPERTIES
    activeProduct,
    products,
    hasProductSelected: !!activeProduct,

    // METHODS
    setActiveProduct,
    startLoadingProducts,
    startSavingProduct,
    startDeletingProduct,
  };
};
