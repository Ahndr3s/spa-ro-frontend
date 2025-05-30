import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { PayPalButtons } from "@paypal/react-paypal-js";

export const PaypalBtns = ({ createOrder, onApprove }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook de navegación

  return (
    <>
      {error && (
        <div className="alert alert-danger">
          Error: {error.message || "Ocurrió un error con PayPal"}
        </div>
      )}
      <PayPalButtons
        createOrder={async () => {
          try {
            const orderId = await createOrder();
            // if (!orderId) {
            //   throw new Error("No se recibió un orderId válido");
            // }
            return orderId;
          } catch (err) {
            console.error("Error en createOrder:", err);
            setError(err);
            throw err; // Re-lanzar para que PayPal lo maneje
          }
        }}
        onApprove={async (data) => {
          try {
            await onApprove(data);
          } catch (err) {
            setError(err);
          }
        }}
        onError={(err) => {
          console.error("Error en PayPal Buttons:", err);
          setError(err);
        }}
        onCancel={() => {
          console.log("Pago cancelado por el usuario.");
          navigate("/home"); // Redirigir a home si se cancela
        }}
      />
    </>
  );
};

PaypalBtns.propTypes = {
  createOrder: PropTypes.func,
  onApprove: PropTypes.func,
};
