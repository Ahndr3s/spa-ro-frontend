import { useLocation } from "react-router-dom";

export const SuccessPage = () => {
  const location = useLocation();
  const orderResult = location.state?.orderResult;
  const message = orderResult.message || "Pago completado.";

  // console.log(message)
  return (
    <>
      <h1>Success Page</h1>
      <p>{message}</p>
    </>
  );
};
