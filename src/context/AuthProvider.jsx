import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { types } from "../types/types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { useAuthStore} from "../hooks/useAuthStore";

// Initialize authState
const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);
  const { checkAuthToken } = useAuthStore(); // Usamos nuestro hook

  useEffect(() => {
    // if(status === "Authenticated"){
    checkAuthToken(); // Verifica el token al montar la app
    // }
  // }, [status]);
  }, []);

  // const login = (data) => {
    // console.log(data)
    // const user = { id: "ABC", email: data.email, name: data.name };

    // const action = {
    //   type: types.login,
    //   payload: user,
    // };

    // localStorage.setItem("user", JSON.stringify(user));
    // localStorage.setItem('token', data.token)
    // localStorage.setItem('token-init-date', new Date().getTime())

    // dispatch(action);
  // };

  const logout = () => {
    localStorage.clear("user");
    const action = {
      type: types.logout,
    };
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        // login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};