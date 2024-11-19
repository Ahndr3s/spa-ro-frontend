import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewOrder,
  onDeleteOrder,
  onLoadOrders,
  onSetActiveOrder,
  onUpdateOrder,
} from "../store/orderSlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";

export const useOrderStore = () => {
  const { orders, activeOrder } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveOrder = (order) => {
    dispatch(onSetActiveOrder(order));
  };

  const startSavingOrder = async (order) => {
    try {
      if (order.id) {
        // console.log("Update order");
        // console.log(order)
        await roApi.put(`/api/payment/${order.id}`, order, {
            headers: {
                Authorization: `Bearer ${}`
            }
        });
        dispatch(onUpdateOrder(order));
        return;
      }
      // console.log("Create order");
      // console.log(order)
      const { data } = await roApi.post('/api/payment', order);
      dispatch(onAddNewOrder({ ...order, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error at saving", error.response.data.msg, "error");
    }
  };

  return {
    // PROPERTIES
    activeOrder,
    orders,
    hasOrderSelected: !!activeOrder,

    // METHOD
    setActiveOrder,
    startSavingOrder,
  };
};
