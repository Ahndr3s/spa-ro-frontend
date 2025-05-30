import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
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
import { useProductStore } from "../hooks/useProductStore";
import { useBannerStore } from "../hooks/useBannerStore";
import { useCategoryStore } from "../hooks/useCategoryStore";
import { useCartStore } from "../hooks/useCartStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { useSalesStore } from "../hooks/useSalesStore";

import { SidePanel } from "./SidePanel";
import { SearchPanel } from "./SearchPanel";
import { toggleSearchPanel, toggleSidePanel } from "../store/interactivePanels";

export const Navbar = () => {
  const dispatch = useDispatch();
  const isSidePanelVisible = useSelector(
    (state) => state.interactivePanels.sidePanelVisible
  );
  const isSearchPanelVisible = useSelector(
    (state) => state.interactivePanels.searchPanelVisible
  );

  const createProduct = useSelector((state) => state.product.createProduct);
  const createBanner = useSelector((state) => state.banner?.createBanner);
  const createCategory = useSelector((state) => state.category?.createCategory);
  const checkSale = useSelector((state) => state.sale?.checkSale);
  const deleteProduct = useSelector((state) => state.product.deleteProduct);
  const deleteBanner = useSelector((state) => state.banner?.deleteBanner);
  const deleteCategory = useSelector((state) => state.category?.deleteCategory);
  const [showNavbar, setShowNavbar] = useState(false);
  const { status, checkAuthToken, startLogout, user } = useAuthStore();
  const { activeProduct } = useProductStore();
  const { activeBanner } = useBannerStore();
  const { activeCategory } = useCategoryStore();
  const { cartProducts, productsQty } = useCartStore();
  const { activeSale } = useSalesStore();

  // SHOWS/HIDES THE NAVBAR
  const handleShowNavbar = () => {
    if (!showNavbar && isSidePanelVisible) {
      dispatch(toggleSidePanel());
    } else if (!showNavbar && isSearchPanelVisible) {
      dispatch(toggleSearchPanel());
    }
    setShowNavbar(!showNavbar);
  };

  // SHOWS/HIDES THE SIDEPANEL
  const handleShowSidePanel = () => {
    if (showNavbar) setShowNavbar(false); // Cierra la navbar si está abierta
    if (isSearchPanelVisible) dispatch(toggleSearchPanel()); // Cierra el SearchPanel
    console.log("Antes de toggle:", isSidePanelVisible);
    dispatch(toggleSidePanel());
    console.log("Después de toggle:", isSidePanelVisible);
  };

  // SHOWS/HIDES THE SEARCHPANEL
  const handleShowSearchPannel = () => {
    if (showNavbar) setShowNavbar(false); // Cierra la navbar si está abierta
    if (isSidePanelVisible) dispatch(toggleSidePanel()); // Cierra el SidePanel
    dispatch(toggleSearchPanel());
  };

  // NAVIGATES TO THE LOGIN PAGE
  const onLogout = () => {
    startLogout();
    navigate("login", {
      replace: true,
    });
    handleShowNavbar();
  };

  // DEFINES WHICH SIDEPANEL TO SHOW
  const determinePanelType = () => {
    if (checkSale) return 6; // CHECKING SALE
    if (
      !createProduct &&
      !deleteProduct &&
      !createBanner &&
      !deleteBanner &&
      !createCategory &&
      !deleteCategory &&
      !checkSale &&
      Object.keys(activeProduct).length > 0
    )
      return 3; // RESUME PRODUCT
    if (
      (createProduct && !deleteProduct) ||
      (createBanner && !deleteBanner) ||
      (checkSale) ||
      (createCategory && !deleteCategory)
    )
      return 4; // CREATE/EDIT PRODUCT/BANNER FORM
    if (
      // !checkSale ||
      (deleteProduct && Object.keys(activeProduct).length > 0 && !checkSale) ||
      (deleteBanner && Object.keys(activeBanner).length > 0 && !checkSale) ||
      (deleteCategory && Object.keys(activeCategory).length > 0 && !checkSale)
    )
      return 5; // DELETING PRODUCT/BANNER
    if (
      !createProduct &&
      Object.keys(activeProduct).length === 0 &&
      !createBanner &&
      Object.keys(activeBanner).length === 0 &&
      !checkSale &&
      cartProducts.length > 0
    )
      return 1; // PRODUCT LIST
    return 2; // EMPTY CART DEFAULT PANEL
  };

  const defineInfoType = () => {
    // activeProduct !== null ? 1 : activeBanner !== null ? 2 : null;
    Object.keys(activeProduct).length > 0
      ? 1
      : Object.keys(activeBanner).length > 0
      ? 2
      : Object.keys(activeCategory).length > 0
      ? 3
      : Object.keys(activeSale).length > 0
      ? 4
      : null;
  };

  //Debug
  // useEffect(() => {
  //   console.log("createProduct:", createProduct);
  //   console.log("deletingProduct:", deleteProduct);
  // }, [createProduct, deleteProduct]);

  useEffect(() => {
    checkAuthToken;
  }, []);

  const navigate = useNavigate();

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
                <span className="link-text">Catálogo</span>
              </NavLink>
            </li>
            <li className="nav-item" onClick={handleShowNavbar}>
              <NavLink className={"nav-link"} to={"/about"}>
                <span className="link-text">Sobre Nosotros</span>
              </NavLink>
            </li>
            {/* <li className="nav-item" onClick={handleShowNavbar}>
              <NavLink className={"nav-link"} to={"/contact"}>
                <span className="link-text">Contáctanos</span>
              </NavLink>
            </li> */}
            {status === "Authenticated" && (
              <>
                <li className="nav-item" onClick={handleShowNavbar}>
                  <NavLink className={"nav-link"} to={"/categories"}>
                    <span className="link-text">Colecciones</span>
                  </NavLink>
                </li>
                <li className="nav-item" onClick={handleShowNavbar}>
                  <NavLink className={"nav-link"} to={"/banners"}>
                    <span className="link-text">Banners</span>
                  </NavLink>
                </li>
                <li className="nav-item" onClick={handleShowNavbar}>
                  <NavLink className={"nav-link"} to={"/salesList"}>
                    <span className="link-text">Ventas</span>
                  </NavLink>
                </li>
                <li className="nav-item-userName">
                  <span className="link-text">{user.name}</span>
                </li>
              </>
            )}
            <li className="nav-item" onClick={onLogout}>
              <NavLink className={"nav-link"} to={"/login"}>
                <span className="link-text">
                  {status === "Authenticated" ? (
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      size="2x"
                      style={{ color: `#fff`, paddingLeft: "2rem" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      size="2x"
                      style={{ color: `#fff`, paddingLeft: "2rem" }}
                    />
                  )}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </ul>
      <div className="end-btn">
        <div onClick={handleShowSearchPannel}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="2x"
            style={{ color: `#fff`, paddingLeft: "2rem", paddingRight: "2rem" }}
          />
        </div>
        <div onClick={handleShowSidePanel} className="cart-container">
          <FontAwesomeIcon
            icon={faCartShopping}
            size="2x"
            style={{ color: `#fff`, paddingRight: "1rem" }}
          />
          {cartProducts.length > 0 && (
            <div className="product-counter">{productsQty}</div>
          )}
        </div>
      </div>
      {isSidePanelVisible && (
        <SidePanel
          panelType={determinePanelType()}
          infoType={defineInfoType()}
        />
      )}

      <SearchPanel />
    </nav>
  );
};

Navbar.propTypes = {
  showSidePanel: PropTypes.bool,
};
