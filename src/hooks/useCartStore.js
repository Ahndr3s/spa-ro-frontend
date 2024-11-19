import { useDispatch, useSelector } from "react-redux";
import {
  onLoadCostumesOnCart,
  onAddNewCostumeOnCart,
  onUpdateCostumeOnCart,
  onSetActiveCostumeOnCart,
  onDeleteCostumeOnCart,
} from "../store/cartSlice";
import Swal from "sweetalert2";

export const useCartStore = () => {
  const { cartCostumes, activeCostumeOnCart } = useSelector((state) => state.costumeOnCart);
  
  const dispatch = useDispatch();

  const setActiveCostumeOnCart = (costumeOnCart) => {
    dispatch(onSetActiveCostumeOnCart(costumeOnCart));
  };

  const startSavingCostumeOnCart = (costumeOnCart) => {
    try {
      if (costumeOnCart.id) {
        dispatch(onUpdateCostumeOnCart(costumeOnCart));
      }
      dispatch(onAddNewCostumeOnCart(costumeOnCart));
    } catch (error) {
      console.log(error)
      Swal.fire('Error at saving ', error.response.data.msg, 'error')
    }
  };

  const startDeletingCostumeOnCart = () => {
    try {
      dispatch(onDeleteCostumeOnCart());
    } catch (error) {
      console.error("Error al intentar eliminar el disfraz del carrito", error);
    }
  };

  const startLoadingCostumesOnCart = () => {
    try {
      // console.dir(data)
      dispatch(onLoadCostumesOnCart(cartCostumes));
    } catch (error) {
      console.log("Error loading costumes");
      console.log(error);
    }
  };

  return{
    activeCostumeOnCart,
    cartCostumes,
    hasCostumeOnCArtSelected: !!activeCostumeOnCart,

    // METHODS
    setActiveCostumeOnCart,
    startSavingCostumeOnCart,
    startDeletingCostumeOnCart,
    startLoadingCostumesOnCart
  }
};
