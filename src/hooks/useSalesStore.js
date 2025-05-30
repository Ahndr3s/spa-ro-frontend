import { useDispatch, useSelector } from "react-redux";
import roApi from "../api/roApi";
import Swal from "sweetalert2";
import { format } from "date-fns";
// import { onCaptureContact, onSetActiveSale, onDeleteSale, onLoadSales } from "../store/saleSlice";
import {
  onSetActiveSale,
  onCaptureContact,
  onDeleteSale,
  onLoadSales,
} from "../store/saleSlice";

export const useSalesStore = () => {
  // const { contacts, activeContact } = useSelector((state) => state.contact);
  const formatedDate = format(Date.now(), "dd/MM/yyyy");
  const { contact, sales, activeSale } = useSelector((state) => state.sale);
  const dispatch = useDispatch();

  const startCapturingContact = (contact) => {
    dispatch(onCaptureContact(contact));
  };

  const setActiveSale = (sale) => {
    dispatch(onSetActiveSale(sale));
  };

  // const startSavingSale = async (order, contactData, subTotal, products) => {
  const startSavingSale = async (contactData, activeOrder) => {

    const reg = contact.region.split('.')
    const sale = {
      type: contactData.type,
      saleDate: formatedDate,
      clientName: `${contactData.name} ${contactData.surName}`,
      clientEmail: contactData.email,
      sellingProducts: activeOrder.sellingProducts,
      contactAddress: `${contact.address} ${contact.zipCode} ${contact.city} ${reg[0]}`,
      subTotal: parseFloat(activeOrder.subTotal),
      // contactReg: reg, 
      contactReg: reg[0], 
      regTariff: parseFloat(reg[1]),
      // user: contact.user
    };
    console.log("----------------THE REAL SALE----------------");
    console.log(sale);
    console.log("--------------------------------");
    // console.log(sale.subTotal+' '+typeof(sale.subTotal));
    // console.log(sale.regTariff+' '+typeof(sale.regTariff));
    
    try {
      let response;
      // if (sale.id !== undefined) {
      //   console.log("Update sale");
      //   response = await roApi.put(`/api/payments/${sale.id}`, { sale });
      // } else {
        console.log("Create sale");
        response = await roApi.post("/api/sales/",  sale);
      // }

      return response.data; // Asegurar que devuelve orderId
    } catch (error) {
      console.error("Error al guardar la venta:", error);
      Swal.fire(
        "Error en la venta",
        error.response?.data?.msg || "Error desconocido",
        "error"
      );
    }
  };

  const startLoadingSales = async () => {
    try {
      const { data } = await roApi.get("/api/sales/");
      // console.dir(data)
      dispatch(onLoadSales(data.sales));
    } catch (error) {
      console.log("Error loading sales");
      console.log(error);
    }
  };

  const startDeletingSale = async () => {
    try {
      await roApi.delete(`api/payments/${activeSale.id}`);
      dispatch(onDeleteSale());
    } catch (error) {
      console.log(error);
      Swal.fire("Error at dating ", error.response.data.msg, "error");
    }
  };

  return {
    // PROPERTIES
    activeSale,
    sales,
    contact,

    hasSaleSelected: !!activeSale,

    // METHOD
    setActiveSale,
    startSavingSale,
    startLoadingSales,
    startDeletingSale,
    startCapturingContact,
  };
};
