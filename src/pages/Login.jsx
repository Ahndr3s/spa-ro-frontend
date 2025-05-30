import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/ro-img.png";
import { SimpleForm } from "../components/SimpleForm";

export const Login = () => {
  const [FormScreen, setFormScreen] = useState(true);
  console.log(FormScreen)

  return (
    <div className="login-form">
      <NavLink
        to={"/home"}
        style={{ display: "flex", flexDirection:"row", justifyContent: "space-around" }}
      >
        <img className="logo-img" src={logo} alt="" />
      </NavLink>
      {FormScreen ? (
        <>
          <SimpleForm formType={1} />
          <button
            className="serv-btn"
            type="button"
            onClick={() => setFormScreen(!FormScreen)}
          >
            Registrarse
          </button>
        </>
      ) : (
        <>
          <SimpleForm formType={2} />
          <button
            className="serv-btn"
            type="button"
            onClick={() => setFormScreen(!FormScreen)}
          >
            Iniciar Sesión
          </button>
        </>
      )}
    </div>
  );
};
