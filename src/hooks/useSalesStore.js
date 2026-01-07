import { useDispatch, useSelector } from "react-redux";
import roApi from "../api/roApi";
import Swal from "sweetalert2";
// import { format } from "date-fns";
import {
  onSetActiveSale,
  onCaptureContact,
  onDeleteSale,
  onLoadSales,
  onSetMostSoldProduct,
} from "../store/saleSlice";

export const useSalesStore = () => {
  // const { contacts, activeContact } = useSelector((state) => state.contact);
  // const formatedDate = format(Date.now(), "dd/MM/yyyy");
  const formatedDate = new Date();
  const { contact, sales, activeSale, setDate, mostSoldProduct, mostSoldProductOfTheMonth } = useSelector(
    (state) => state.sale
  );
  const dispatch = useDispatch();

  // CHANGES THE STATE OF CAPTURING THE CONTACT FORM
  const startCapturingContact = (contact) => {
    dispatch(onCaptureContact(contact));
  };

  // ALLOWS US TO SEE THE SALE'S DEATAILS
  const setActiveSale = (sale) => {
    dispatch(onSetActiveSale(sale));
  };

  // TRIGGERS THE REQUEST TO REGISTER AND UPDATE A SALE RECORD
  const startSavingSale = async (contactData, activeOrder) => {
    console.log(contactData);
    // const reg = contact.region.split(".");
    const reg = contactData.contactProStaReg.split(".");
    const sale = {
      type: contactData.contactType,
      saleDate: formatedDate,
      clientName: `${contactData.contactName} ${contactData.contactSurName}`,
      clientEmail: contactData.contactEmail,
      sellingProducts: activeOrder.sellingProducts,
      contactAddress: `${contact.contactAddress} ${contact.contactZipCode} ${contact.contactCity} ${reg[0]}`,
      subTotal: parseFloat(activeOrder.subTotal),
      // subTotal: parseFloat(activeOrder.subTotal) +
      //               parseFloat(activeOrder.subTotal * 0.16) +
      //               parseFloat(reg[1]),
      contactReg: reg[0],
      regTariff: parseFloat(reg[1]),
      Iva: parseFloat(activeOrder.subTotal * 0.16),
      // user: contact.user
    };
    // console.log("----------------THE REAL SALE----------------");
    // console.log(sale);
    // console.log("--------------------------------");
   

    try {
      let response;
      // if (sale.id !== undefined) {
      //   console.log("Update sale");
      //   response = await roApi.put(`/api/payments/${sale.id}`, { sale });
      // } else {
      // console.log("Create sale");
      response = await roApi.post("/api/sales/", sale);
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

  // TRIGGERS THE REQUEST TO GET ALL THE SALES RECORDS
  const startLoadingSales = async () => {
    try {
      // const { data } = await roApi.get("/api/sales/");
      const { data } = await roApi.get("/api/sales/summary/salesOfTheMonth/");
      // console.dir('consegui esto')
      // console.dir(data)
      // dispatch(onLoadSales(data.sales));
      dispatch(onLoadSales(data));
    } catch (error) {
      console.log("Error loading sales");
      console.log(error);
    }
  };

  // TRIGGERS THE REQUEST TO DELETE A SALE RECORD
  const startDeletingSale = async () => {
    try {
      await roApi.delete(`api/payments/${activeSale.id}`);
      dispatch(onDeleteSale());
    } catch (error) {
      console.log(error);
      Swal.fire("Error at dating ", error.response.data.msg, "error");
    }
  };

// ------------------------ANALYICS REQUESTS---------------------------------

  // TRIGGERS THE REQUEST TO GET THE MOST SOLD PRODUCT OF THE COLLECTION
  const startLoadingMostSold = async () => {
    console.log('Herramienta 1')
    // try {
    //   const { data } = await roApi.get(`/api/sales/summary/mostSold`);
    //   dispatch(onSetMostSoldProduct(data));
    //   console.log(mostSoldProduct)
    // } catch (error) {
    //   console.error("Error fetching the most sold product");
    // }
  };

  // TRIGGERS THE REQUEST TO GET THE MONTH'S MOST SOLD PRODUCT
  const startLoadingMostSoldOfTheMonth = async (inputDate) => {
    // console.log('Herramienta 2')
    try {
      const { data } = await roApi.get(`/api/sales/summary/mostSoldOfTheMonth/${inputDate}`);
      dispatch(onSetMostSoldProduct(data[0]));
      console.log(mostSoldProduct)
    } catch (error) {
      console.error("Error fetching the most sold product of the month");
    }
  };

  return {
    // PROPERTIES
    activeSale,
    sales,
    contact,
    mostSoldProduct,
    mostSoldProductOfTheMonth,
    setDate,

    hasSaleSelected: !!activeSale,

    // METHOD
    setActiveSale,
    startSavingSale,
    startLoadingSales,
    startDeletingSale,
    startCapturingContact,
    startLoadingMostSold,
    startLoadingMostSoldOfTheMonth,
  };
};
