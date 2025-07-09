import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Card } from "../components/Card";
import { useOrderStore } from "../hooks/useOrderStore";
import { useSalesStore } from "../hooks/useSalesStore";
import getEnvVariables from "../helpers/getEnvVariables";
import { PaypalBtns } from "../components/PaypalBtns";
import { SimpleForm } from "../components/SimpleForm";
import "./CheckoutPageStyles.css";

const { VITE_PAYPAL_API_CLIENT } = getEnvVariables();

export const CheckoutPage = () => {
  const { activeOrder, startSavingOrder, startApprovingOrder } =
    useOrderStore();
  const { contact, startSavingSale } = useSalesStore();
  const navigate = useNavigate();
  const [paypalError, setPaypalError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const notEmpty = Object.keys(contact).length !== 0;

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

      const orderResponse = await startSavingOrder(activeOrder);
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
          currency: "USD",
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
              <SimpleForm formType={4} />
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
            <ul style={{listStyle:"none"}}>
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
                    />
                  ))
                ) : (
                  <p>No hay productos en la orden</p>
                )}
              </li>
            </ul>
            <div className="sidepanel-footer">
              Subtotal: ${activeOrder.subTotal}
            </div>
          </div>
        </div>
      </PayPalScriptProvider>
    </>
  );
};
