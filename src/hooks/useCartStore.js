import { useDispatch, useSelector } from "react-redux";
import {
  onLoadProductsOnCart,
  onAddNewProductOnCart,
  onUpdateProductOnCart,
  onSetActiveProductOnCart,
  onDeleteProductOnCart,
  onUpdateProductQty,
} from "../store/cartSlice";
import Swal from "sweetalert2";

export const useCartStore = () => {
  const dispatch = useDispatch();
  const { cartProducts, activeProductOnCart, productsQty } = useSelector((state) => state.productOnCart);

  const setActiveProductOnCart = (productOnCart) => {
    dispatch(onSetActiveProductOnCart(productOnCart));
  };

  const startSavingProductOnCart = (productOnCart) => {
    try {
      // if ( cartProducts.includes(productOnCart.id)) {
      if ( cartProducts.some(prod => (prod.id === productOnCart.id && prod.size === productOnCart.size))) {
        // alert('Ya habia llegado')
        dispatch(onUpdateProductOnCart(productOnCart));
      }else {
        dispatch(onAddNewProductOnCart(productOnCart));
      }
      // localStorage.setItem('productsOnCart', JSON.stringify(cartProducts))
    } catch (error) {
      console.log(error)
      Swal.fire('Error at saving ', error.response.data.msg, 'error')
    }
  };
  
  const startDeletingProductOnCart = () => {
    try {
      dispatch(onDeleteProductOnCart());
    } catch (error) {
      console.error("Error al intentar eliminar el producto del carrito", error);
    }
  };
  
  const startLoadingProductsOnCart = () => {
    try {
      // console.dir(data)
      dispatch(onLoadProductsOnCart(cartProducts));      
    } catch (error) {
      console.log("Error loading costumes");
      console.log(error);
    }
  };

  const startUpdatingProductQty = () => {
    dispatch(onUpdateProductQty());
  };

  return{
    activeProductOnCart,
    cartProducts,
    productsQty,
    hasCostumeOnCArtSelected: !!activeProductOnCart,

    // METHODS
    setActiveProductOnCart,
    startSavingProductOnCart,
    startDeletingProductOnCart,
    startLoadingProductsOnCart,
    startUpdatingProductQty
  }
};
