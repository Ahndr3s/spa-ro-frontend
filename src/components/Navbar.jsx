import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {
  faBars,
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./NavbarStyles.css";
import logo from "../../assets/logo.png";
import { SidePanel } from "./SidePanel";
import { useCostumeStore } from "../hooks/useCostumeStore";
import { useCartStore } from "../hooks/useCartStore";
import { useDispatch } from "react-redux";
import { toggleSidePanel } from "../store/SidePanelSlice";


export const Navbar = () => {
  const dispatch = useDispatch()
  const [showNavbar, setShowNavbar] = useState(false);
  const [setShowCartbar] = useState(false);
  // const { status, checkAuthToken, startLogout, user } = useAuthStore();

  const { activeCostume } = useCostumeStore();
  const { cartCostumes } = useCartStore();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    if (!showNavbar) {
      setShowCartbar(false); // Cierra el cartbar si se abre el navbar
    }
  };

  const handleShowSidePanel = () => {
    dispatch(toggleSidePanel())
  };

  // const handleShowSearch = () => {
  //   navigate("/SearchPage", {
  //     replace: true,
  //   });
  // };

  // useEffect(() => {
  //   checkAuthToken;
  // }, []);

  // const navigate = useNavigate();

  // const onLogout = () => {
  // //   startLogout();
  //   navigate("login", {
  //     replace: true,
  //   });
  //   handleShowNavbar();
  // };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="menu-icon" onClick={handleShowNavbar}>
          <FontAwesomeIcon icon={faBars} size="2x" style={{ color: `#fff` }} />
        </li>
        <li className="logo">
          <Link to={"home"}>
            <img className="logo-img" src={logo} alt="" />
          </Link>
        </li>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          <ul>
            <li className="nav-item" onClick={handleShowNavbar}>
              <NavLink className={"nav-link"} to={"/collections"}>
                <span className="link-text">Colecciones</span>
              </NavLink>
            </li>
            <li className="nav-item" onClick={handleShowNavbar}>
              <NavLink className={"nav-link"} to={"/about"}>
                <span className="link-text">Sobre Nosotros</span>
              </NavLink>
            </li>

            <li className="nav-item" onClick={handleShowNavbar}>
              <NavLink className={"nav-link"} to={"/contact"}>
                <span className="link-text">Contáctanos</span>
              </NavLink>
            </li>
            {/* {status === "Authenticated" && (
                <>
                  <li className="nav-item userName">
                    <span className="link-text">{user.name}</span>
                  </li>
                </>
              )} */}
            {/* <li className="nav-item" onClick={onLogout}> */}
            <li className="nav-item">
              <NavLink className={"nav-link"} to={"/login"}>
                {/* <span className="link-text">{status === "Authenticated" ? "Cerrar Sesión" : "Iniciar Sesión"}</span> */}
                {/* <span className="link-text">Log in</span> */}
                {/* <FontAwesomeIcon
                  icon={faRightFromBracket}
                  size="2x"
                  style={{ color: `#fff`, paddingLeft: "2rem" }}
                /> */}
                <FontAwesomeIcon
                  icon={faUser}
                  size="2x"
                  style={{ color: `#fff`, paddingLeft: "2rem" }}
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </ul>
      {/* <div className="search-btn" onClick={handleShowSearch}> */}
      <div className="end-btn">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="2x"
          style={{ color: `#fff`, paddingLeft: "2rem" }}
        />
        <div onClick={handleShowSidePanel}>
          <FontAwesomeIcon
            icon={faCartShopping}
            size="2x"
            style={{ color: `#fff`, paddingLeft: "1rem" }}
          />
        </div>
      </div>
      {activeCostume ? (
        <SidePanel
          panelType={3}
        />
      ) : cartCostumes && cartCostumes.length > 0 ? (
        <SidePanel
          panelType={1}
        />
      ) : (
        <SidePanel
          panelType={2}
        />
      )}
    </nav>
  );
};

Navbar.propTypes = {
  showSidePanel: PropTypes.bool,
};
