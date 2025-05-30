import { useDispatch, useSelector } from "react-redux";
// import getEnvVariables from "../helpers/getEnvVariables";
import {
  // onAddNewOrder,
  onDeleteOrder,
  onLoadOrders,
  onSetActiveOrder,
  // onUpdateOrder,
} from "../store/orderSlice";
import roApi from "../api/roApi";
import Swal from "sweetalert2";
// const {VITE_API_URL} = getEnvVariables()

export const useOrderStore = () => {
  const { orders, activeOrder } = useSelector((state) => state.order);
  // const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveOrder = (order) => {
    dispatch(onSetActiveOrder(order));
  };

  // SAVES THE RECORD OF THE SALE ON THE orders ARRAY
  // const startSavingOrder = async (order) => {
  //   // console.log(order)
  //   try {
  //     if (order.id !== undefined) {
  //       console.log("Update order");
  //       // console.log(order)
  //       await roApi.put(`/api/payments/${order.id}`, order);
  //       dispatch(onUpdateOrder(order));
  //       return;
  //     }
  //     console.log("Create order");
  //     console.log(order)
  //     // const { data } = await roApi.post("/api/payments", order);
  //     await roApi.post("/api/payments", order);
  //     // dispatch(onAddNewOrder({ ...order, id: data.event.id, user }));
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire("Error at saving", error.response.data.msg, "error");
  //   }
  // };

  const startSavingOrder = async (order) => {
    try {
      let response;
      if (order.id !== undefined) {
        console.log("Update order");
        response = await roApi.put(`/api/payments/${order.id}`, { order });
      } else {
        console.log("Create order");
        response = await roApi.post("/api/payments/", { order });
        // console.log(typeof(order))
      }

      // Verificar que la respuesta tenga los datos esperados
      if (!response.data || !response.data?.orderId) {
        throw new Error("Respuesta del servidor incompleta");
      }

      // Almacenar backup en localStorage por si sessionStorage falla
      // if (response.data.accessToken) {
      localStorage.setItem("paypalBackupToken", response.data.accessToken);
      // }

      // return response.data; // Asegurar que devuelve orderId
      return {
        orderId: response.data.orderId,
        accessToken: response.data.accessToken,
      };
      
    } catch (error) {
      console.error("Error al guardar la orden:", error);
      Swal.fire(
        "Error en la orden",
        error.response?.data?.msg || "Error desconocido",
        "error"
      );
      // IMPORTANTE: Relanzar el error para que pueda ser capturado por onCheckoutSubmit
      throw error;
    }
  };

  const startApprovingOrder = async ({ orderID, accessToken }) => {
    try {
      console.log("Capturando orden con ID:", orderID);

      // Sistema de recuperación de token en capas
      const token =
        accessToken ||
        sessionStorage.getItem("paypalAccessToken") ||
        localStorage.getItem("paypalBackupToken");

      if (!token) {
        throw new Error("No se pudo obtener el token de acceso");
      }

      const response = await roApi.post("/api/payments/success", {
        orderId: orderID,
        accessToken: token,
      });

      console.log("Orden aprobada:", response.data);
      return response.data;
      //CODE HERE TO STORE CONATCT FORM DATA
    } catch (error) {
      console.error("Error al aprobar la orden:", error);
      Swal.fire(
        "Error en la orden",
        error.response?.data?.msg || "Error desconocido",
        "error"
      );
    }
  };

  const startDeletingOrder = async () => {
    try {
      await roApi.delete(`api/payments/${activeOrder.id}`);
      dispatch(onDeleteOrder());
    } catch (error) {
      console.log(error);
      Swal.fire("Error at dating ", error.response.data.msg, "error");
    }
  };

  const startLoadingOrder = async () => {
    try {
      const { data } = await roApi.get("/api/payments");
      // console.dir(data)
      dispatch(onLoadOrders(data.orders));
    } catch (error) {
      console.log("Error loading orders");
      console.log(error);
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
    startLoadingOrder,
    startDeletingOrder,
    startApprovingOrder,
  };
};
