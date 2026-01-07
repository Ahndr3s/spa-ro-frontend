import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Card } from "../components/Card";
import { useOrderStore } from "../hooks/useOrderStore";
import { useSalesStore } from "../hooks/useSalesStore";
import getEnvVariables from "../helpers/getEnvVariables";
import { PaypalBtns } from "../components/PaypalBtns";
import Swal from "sweetalert2";
// import { SimpleForm } from "../components/SimpleForm";
import "./CheckoutPageStyles.css";

const { VITE_PAYPAL_API_CLIENT } = getEnvVariables();

export const CheckoutPage = () => {
  const { activeOrder, startSavingOrder, startApprovingOrder } =
    useOrderStore();
  const { contact, startSavingSale, startCapturingContact } = useSalesStore();
  const navigate = useNavigate();
  const [paypalError, setPaypalError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const notEmpty = Object.keys(contact).length !== 0;
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    contactType: "7",
    contactEmail: "",
    contactName: "",
    contactSurName: "",
    contactAddress: "",
    contactCity: "",
    contactProStaReg: "",
    contactZipCode: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const states = [
    { name: "Aguascalientes", tariff: "AGS.100" },
    { name: "Baja California", tariff: "BC.100" },
    { name: "Baja California Sur", tariff: "BCS.100" },
    { name: "Campeche", tariff: "CAM.100" },
    { name: "Coahuila", tariff: "COA.100" },
    { name: "Colima", tariff: "COL.100" },
    { name: "Chiapas", tariff: "CHP.100" },
    { name: "Chihuahua", tariff: "CHH.100" },
    { name: "Ciudad de México", tariff: "CDMX.100" },
    { name: "Durango", tariff: "DUR.100" },
    { name: "Guanajuato", tariff: "GUA.100" },
    { name: "Guerrero", tariff: "GRO.100" },
    { name: "Hidalgo", tariff: "HID.100" },
    { name: "Jalisco", tariff: "JAL.100" },
    { name: "México", tariff: "MEX.100" },
    { name: "Michoacán", tariff: "MIC.100" },
    { name: "Morelos", tariff: "MOR.100" },
    { name: "Nayarit", tariff: "NAY.100" },
    { name: "Nuevo León", tariff: "NL.100" },
    { name: "Oaxaca", tariff: "OAX.100" },
    { name: "Puebla", tariff: "PUE.100" },
    { name: "Querétaro", tariff: "QUE.100" },
    { name: "Quintana Roo", tariff: "ROO.100" },
    { name: "San Luis Potosí", tariff: "SLP.100" },
    { name: "Sinaloa", tariff: "SIN.100" },
    { name: "Sonora", tariff: "SON.100" },
    { name: "Tabasco", tariff: "TAB.100" },
    { name: "Tamaulipas", tariff: "TAM.100" },
    { name: "Tlaxcala", tariff: "TLX.100" },
    { name: "Veracruz", tariff: "VER.100" },
    { name: "Yucatán", tariff: "YUC.100" },
    { name: "Zacatecas", tariff: "ZAC.100" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);

    if (Object.values(form).every((value) => value !== "")) {
      dispatch(startCapturingContact(form));
      // console.log(contactFormData);
      // Reset form
      setForm({
        contactType: "7",
        contactEmail: "",
        contactName: "",
        contactSurName: "",
        contactAddress: "",
        contactCity: "",
        contactProStaReg: "",
        contactZipCode: "",
        contactPhone: "",
      });
      return true;
    } else {
      Swal.fire(
        "Error en cpatura de datos",
        "Por favor llana el formulario de contacto",
        "error"
      );
      return;
    }
  };

  // TRIGGERS A PAYPAL REQUEST TO START A PAYPAL CHECKOUT
  const onCheckoutSubmit = async () => {
    try {
      setIsProcessing(true);
      setPaypalError(null);

      // Validar que hay productos en la orden
      if (
        !activeOrder?.sellingProducts ||
        activeOrder.sellingProducts.length === 0
      ) {
        throw new Error("No hay productos en la orden");
      }

      // Validar que el formulario de contacto esté completo
      if (!notEmpty) {
        throw new Error("Por favor complete la información de contacto");
      }

      const orderResponse = await startSavingOrder({
        ...activeOrder,
        contactAddress: `${form.contactAddress} ${form.contactZipCode} ${
          form.contactCity
        } ${form.contactProStaReg.split(".")[0]}`,
        regTariff: form.contactProStaReg.split(".")[1],
        Iva: parseFloat(activeOrder.subTotal *0.16),

      });
      // console.log("On Checkout Submit ");
      // console.dir(orderResponse);

      if (!orderResponse?.orderId) {
        throw new Error("No se recibió un orderId válido");
      }

      // Almacenar en sessionStorage y en estado local como respaldo
      if (orderResponse.accessToken) {
        sessionStorage.setItem("paypalAccessToken", orderResponse.accessToken);
        localStorage.setItem("paypalBackupToken", orderResponse.accessToken);
      }

      return orderResponse.orderId;
    } catch (error) {
      console.error("Error en onCheckoutSubmit:", error);
      setPaypalError(error.message || "Error al procesar el pago");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  // TRIGGERS A PAYPAL REQUEST TO APPROVE A SALE
  const onApprove = async (data) => {
    // console.log("On Aprove: ");
    // console.dir(data);
    try {
      setIsProcessing(true);
      setPaypalError(null);

      const accessToken =
        sessionStorage.getItem("paypalAccessToken") ||
        localStorage.getItem("paypalBackupToken");

      if (!accessToken) {
        throw new Error("Token de acceso no encontrado");
      }

      const result = await startApprovingOrder({
        orderID: data.orderID,
        accessToken: accessToken,
      });

      // Limpiar después de uso exitoso
      sessionStorage.removeItem("paypalAccessToken");
      localStorage.removeItem("paypalBackupToken");

      navigate("/successPage", { state: { orderResult: result } });
      startSavingSale(contact, activeOrder);
    } catch (error) {
      console.error("Error en onApprove:", error);
      setPaypalError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {isProcessing && (
        <div className="loading-indicator">Procesando pago...</div>
      )}

      <PayPalScriptProvider
        options={{
          "client-id": VITE_PAYPAL_API_CLIENT,
          currency: "MXN",
          intent: "capture",
          commit: "true", // Importante para evitar doble login
          vault: "false",
          // debug: "true",
        }}
      >
        <div className="checkoutContainer">
          <div className="checkoutForm-container">
            <div className="checkoutForm">
              <h2>Información de Contacto</h2>
              {/* <SimpleForm formType={4} /> */}
              {/* <form className="simple-form" onSubmit={handleContactSubmit}> */}
              <form className="simple-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="contactEmail"
                  className="email"
                  placeholder="Correo"
                  value={form.contactEmail}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="contactName"
                  className="userName"
                  placeholder="Nombre"
                  value={form.contactName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="contactSurName"
                  className="userName"
                  placeholder="Apellidos"
                  value={form.contactSurName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="contactAddress"
                  className="userName"
                  placeholder="Calle, Número exterior y Número interior"
                  value={form.contactAddress}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="contactCity"
                  className="userName"
                  placeholder="Ciudad"
                  value={form.contactCity}
                  onChange={handleChange}
                />
                <select
                  name="contactProStaReg"
                  id="proStaReg"
                  className="form-sizes"
                  value={form.contactProStaReg}
                  onChange={handleChange}
                >
                  <option key={`opt0`} value={""}>
                    selecciona tu Estado
                  </option>
                  {states.map((state) => (
                    <option key={`opt${state.name}`} value={state.tariff}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="contactZipCode"
                  className="userName"
                  placeholder="Código Postal"
                  value={form.contactZipCode}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="contactPhone"
                  className="phone"
                  placeholder="Telefono"
                  value={form.contactPhone}
                  onChange={handleChange}
                />
                {Object.keys(contact).length === 0 && (
                  <input className="serv-btn" type="submit" value="Continuar" />
                )}
              </form>

              <br />
              {notEmpty === true && (
                <div>
                  <PaypalBtns
                    createOrder={onCheckoutSubmit}
                    onApprove={onApprove}
                    onError={(error) => {
                      console.error("Error en PayPal Buttons:", error);
                      setPaypalError(error);
                    }}
                  />
                  {paypalError && (
                    <div className="error-message">
                      Error:{" "}
                      {paypalError.message || "Ocurrió un error con PayPal"}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="orderSummary">
            <div className="sidepanel-header-t1">
              <h2>Resumen de Orden</h2>
            </div>
            <ul style={{ listStyle: "none" }}>
              <li className="nav-item">
                {activeOrder?.sellingProducts?.length > 0 ? (
                  activeOrder.sellingProducts.map((card, index) => (
                    <Card
                      id={card.id}
                      key={`t1${index}`}
                      cardType={7}
                      title={card.title}
                      img={card.img}
                      price={card.price}
                      size={card.size}
                      qty={card.qty}
                      type={card.type}
                    />
                  ))
                ) : (
                  <p>No hay productos en la orden</p>
                )}
              </li>
            </ul>
            <div className="orderSummary-footer">
              Subtotal: ${activeOrder.subTotal}
            </div>
            <div className="orderSummary-footer">
              IVA: ${activeOrder.subTotal * 0.16}
            </div>
            {form.contactProStaReg !== "" ? (
              <>
                <div className="orderSummary-footer">
                  Tarifa de Envio: ${form.contactProStaReg.split(".")[1]}
                </div>
                <div className="orderSummary-footer-total">
                  Total: $
                  {parseFloat(activeOrder.subTotal) +
                    parseFloat(activeOrder.subTotal * 0.16) +
                    parseFloat(form.contactProStaReg.split(".")[1])}
                </div>
              </>
            ) : (
              <>
                <div className="orderSummary-footer">
                  Tarifa de Envio: A Calcular
                </div>
                <div className="orderSummary-footer-total">
                  Total: A Calcular
                </div>
              </>
            )}
          </div>
        </div>
      </PayPalScriptProvider>
    </>
  );
};
