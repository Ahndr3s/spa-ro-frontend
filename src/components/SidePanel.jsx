import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  toggleCreativeProdMode,
  toggleDeletingProdMode,
  onSetActiveProduct,
} from "../store/productSlice";
import {
  toggleCreateBannerMode,
  toggleDeletingBannerMode,
  onSetActiveBanner,
} from "../store/bannerSlice";
import {
  toggleCreativeCatMode,
  onSetActiveCategory,
  toggleDeletingCatMode,
} from "../store/categorySlice";
import {
  onCheckingSale,
  onSetMostSoldProduct,
  onSettiningDate,
} from "../store/saleSlice";
import { onLogoutProductsOnCart } from "../store/cartSlice";
import { onSetActiveOrder } from "../store/orderSlice";
import { useProductStore } from "../hooks/useProductStore";
import { useBannerStore } from "../hooks/useBannerStore";
import { useCartStore } from "../hooks/useCartStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { useSalesStore } from "../hooks/useSalesStore";
import { useCategoryStore } from "../hooks/useCategoryStore";
import { toggleSidePanel } from "../store/interactivePanels";
import { Card } from "./Card";
import { SimpleForm } from "./SimpleForm";
import { useForm } from "../hooks/useForm";
import "../index.css";

export const SidePanel = ({ panelType, infoType }) => {
  let panelOption;
  const [Subtotal, setSubtotal] = useState(0);
  const { activeProduct, startDeletingProduct } = useProductStore();
  const { activeBanner, startDeletingBanner } = useBannerStore();
  const { activeCategory, startDeletingCategory } = useCategoryStore();
  const {
    activeSale,
    setActiveSale,
    setDate,
    startLoadingMostSoldOfTheMonth,
    mostSoldProduct,
  } = useSalesStore();
  const { cartProducts } = useCartStore();

  const createProduct = useSelector((state) => state.product.createProduct);
  const createBanner = useSelector((state) => state.banner?.createBanner);
  const createCategory = useSelector((state) => state.category?.createCategory);
  const checkSale = useSelector((state) => state.sale.checkSale);
  const isVisible = useSelector(
    (state) => state.interactivePanels.sidePanelVisible
  );

  const navigate = useNavigate();
  const { status } = useAuthStore();
  const dispatch = useDispatch();
  const dateField = { datePicker: "" };

  const { datePicker, onInputChange: onDateInputChange } = useForm(dateField);

  // HIDES SIDEPANEL
  const handleSeeProductOnCart = () => {
    if (status === "Authenticated") {
      if (createProduct || infoType === 1) {
        dispatch(toggleCreativeProdMode());
      } else if (createBanner || infoType === 2) {
        dispatch(toggleCreateBannerMode());
        dispatch(onSetActiveBanner({}));
      } else if (createCategory || infoType === 3) {
        dispatch(toggleCreativeCatMode());
        dispatch(onSetActiveCategory({}));
      } else if (checkSale) {
        dispatch(onCheckingSale());
        setActiveSale({});
      } else if (setDate) {
        dispatch(onSettiningDate());
      } else if (Object.keys(mostSoldProduct).length > 0) {
        dispatch(onSetMostSoldProduct({}));
      }
    }
    dispatch(onSetActiveProduct({}));
    dispatch(toggleSidePanel());
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN PRODUCT TO EDIT
  const handleCancelProdDelete = (e) => {
    e.stopPropagation();
    dispatch(toggleDeletingProdMode());
    dispatch(onSetActiveProduct(""));
    dispatch(toggleSidePanel());
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN BANNER TO EDIT
  const handleCancelBannerDelete = (e) => {
    e.stopPropagation();
    dispatch(toggleDeletingBannerMode());
    dispatch(onSetActiveBanner(""));
    dispatch(toggleSidePanel());
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN CATEGORY TO EDIT
  const handleCancelCategoryDelete = (e) => {
    e.stopPropagation();
    dispatch(toggleDeletingCatMode());
    dispatch(onSetActiveCategory(""));
    dispatch(toggleSidePanel());
  };

  // DELETES THE SELECTED PRODUCT
  const handleDeleteProduct = () => {
    if (infoType !== "" || infoType !== null) {
      startDeletingProduct();
      dispatch(toggleDeletingProdMode());
    } else console.log("No hay datos de producto que borrar");
  };

  // DELETES THE SELECTED BANNER
  const handleDeleteBanner = () => {
    if (infoType !== "" || infoType !== null) {
      startDeletingBanner();
      dispatch(toggleDeletingBannerMode());
    } else console.log("No hay datos de banner que borrar");
  };

  // DELETES THE SELECTED CATEGORY
  const handleDeleteCategory = () => {
    if (infoType !== "" || infoType !== null) {
      startDeletingCategory();
      dispatch(toggleDeletingCatMode());
    } else console.log("No hay datos de vategoria que borrar");
  };

  // LEADS TO checkoutPage PASSING THE cartProducts and subTotal VALUES
  // TO ActiveOrder STATE
  const handleCheckout = () => {
    dispatch(
      onSetActiveOrder({ sellingProducts: cartProducts, subTotal: Subtotal })
    );
    dispatch(onLogoutProductsOnCart());
    dispatch(toggleSidePanel());
    navigate(`/checkout`, {
      replace: true,
    });
  };

  // Update subtotal whenever cartProducts changes
  useEffect(() => {
    const total = cartProducts.reduce(
      (acc, item) => acc + (Number(item.price) * item.qty || 0),
      0
    );
    setSubtotal(total);
  }, [cartProducts]);

  const handlePickDate = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      // Convertir YYYY-MM-DD a DD/MM/YYYY
      if (datePicker) {
        startLoadingMostSoldOfTheMonth(datePicker);
        dispatch(onSettiningDate());
        // dispatch(onSetActiveProduct(mostSoldProduct))
        // console.log(typeof(datePicker)+' '+ datePicker);
      }
    }
  };

  switch (panelType) {
    // CART PRODUCT LIST
    case 1:
      panelOption = (
        <>
          <div className="sidepanel-header-t1">
            <h3>Mi Carrito</h3>
          </div>
          <ul className="products-onCart">
            <li className="nav-item" onClick={handleSeeProductOnCart}>
              {cartProducts.map((card, index) => (
                <Card
                  id={card.id}
                  key={`t1${index}`}
                  cardType={3}
                  title={card.title}
                  img={card.img}
                  price={card.price}
                  size={card.size}
                  qty={card.qty}
                  type={card.type}
                />
              ))}
            </li>
          </ul>
          <div className="sidepanel-footer">
            Subtotal: ${Subtotal}
            <button className="primary-btn-drk" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      );
      break;

    // CART EMPTY
    case 2:
      panelOption = (
        <>
          <div className="sidepanel-header-t2">
            <h3>Mi Carrito</h3>
          </div>
          <div className="emptyMsg">
            <h2>Tu carrito está vacío :/</h2>
          </div>
        </>
      );
      break;

    // PRODUCT RESUME
    case 3:
      panelOption = (
        <>
          <div className="sidepanel-header-t3">
            {setDate ? (
              <h3>Elige una Fecha</h3>
            ) : Object.keys(activeProduct).length > 0 ? (
              <h3>Agregar al Carrito</h3>
            ) : (
              Object.keys(mostSoldProduct).length > 0 && (
                <h3>Producto Más Vendido del Mes</h3>
              )
            )}
            <div className="x-contain" onClick={handleSeeProductOnCart}>
              <FontAwesomeIcon
                icon={faXmark}
                size="2x"
                style={{ color: `#fff` }}
              />
            </div>
          </div>
          {Object.keys(activeProduct).length > 0 ? (
            <Card
              cardType={4}
              id={activeProduct.id}
              title={activeProduct.title}
              info={activeProduct.info}
              img={activeProduct.img}
              price={activeProduct.price}
              size={activeProduct.size}
              stock={activeProduct.stock}
              type={activeProduct.type}
            />
          ) : Object.keys(mostSoldProduct).length > 0 ? (
            <Card
              cardType={8}
              id={mostSoldProduct.id}
              title={mostSoldProduct.title}
              info={mostSoldProduct.info}
              img={mostSoldProduct.img}
              price={mostSoldProduct.price}
              // stock={activeProduct.stock}
              type={mostSoldProduct.type}
            />
          ) : (
            <input
              type="date"
              name="datePicker"
              placeholder="Fecha de vta"
              value={datePicker || ""}
              onChange={onDateInputChange}
              onKeyDown={(e) => handlePickDate(e, datePicker)}
            />
          )}
        </>
      );
      break;

    // PRODUCT/BANNER/CATEGORY FORM
    case 4:
      panelOption = (
        <>
          <div className="sidepanel-header-t3">
            <h3>Action Producto</h3>
            <div className="x-contain" onClick={handleSeeProductOnCart}>
              <FontAwesomeIcon
                icon={faXmark}
                size="2x"
                style={{ color: `#fff` }}
              />
            </div>
          </div>
          {createProduct && (
            <SimpleForm formType={3} info={activeProduct || {}} />
          )}
          {createBanner && (
            <SimpleForm formType={5} info={activeBanner || {}} />
          )}
          {createCategory && (
            <SimpleForm formType={6} info={activeCategory || {}} />
          )}
        </>
      );
      break;

    // DELETING PRODUCT
    case 5:
      panelOption = (
        <>
          <div className="sidepanel-header-t2">
            <h3>Eliminar Producto</h3>
          </div>

          <div className="deletingMsg">
            <h2>
              ¿Deseas eliminar a{" "}
              {activeProduct.title ||
                activeBanner.title ||
                activeCategory.title}
              ?
            </h2>
            <div className="deletingBtns">
              {Object.keys(activeProduct).length !== 0 && (
                <>
                  <button
                    className="primary-btn-drk"
                    onClick={handleDeleteProduct}
                  >
                    Eliminar
                  </button>
                  <button
                    className="primary-btn-drk"
                    onClick={handleCancelProdDelete}
                  >
                    Cancelar
                  </button>
                </>
              )}
              {Object.keys(activeBanner).length !== 0 && (
                <>
                  <button
                    className="primary-btn-drk"
                    onClick={handleDeleteBanner}
                  >
                    Eliminar
                  </button>
                  <button
                    className="primary-btn-drk"
                    onClick={handleCancelBannerDelete}
                  >
                    Cancelar
                  </button>
                </>
              )}
              {Object.keys(activeCategory).length !== 0 && (
                <>
                  <button
                    className="primary-btn-drk"
                    onClick={handleDeleteCategory}
                  >
                    Eliminar
                  </button>
                  <button
                    className="primary-btn-drk"
                    onClick={handleCancelCategoryDelete}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      );
      break;

    // SALES LIST
    case 6:
      panelOption = (
        <>
          <div
            className="x-contain"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "3rem",
            }}
            onClick={handleSeeProductOnCart}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              style={{ color: `#fff` }}
            />
          </div>
          <div className="sidepanel-header-t2">
            <h3>MIS VENTAS</h3>
          </div>
          <div className="saleDetails">
            <div className="saleDetails-fields">
              Id: <em className="saleDetails-data">{activeSale.id}</em>
            </div>
            <div className="saleDetails-fields">
              Fecha: <em className="saleDetails-data">{activeSale.saleDate}</em>
            </div>
            <div className="saleDetails-fields">
              Cliente:{" "}
              <em className="saleDetails-data">{activeSale.clientName}</em>
            </div>
            <div className="saleDetails-fields">
              Email de Cliente:{" "}
              <em className="saleDetails-data">{activeSale.clientEmail}</em>
            </div>
            <div className="saleDetails-fields">
              Dirección:{" "}
              <em className="saleDetails-data">{activeSale.contactAddress}</em>
            </div>
            <div className="saleList-header">
              <h4>Productos Vendidos</h4>
              <hr />
            </div>
            <div className="saleList-container">
              <ul
                className="saleDetails-prods"
                style={{ marginBottom: "6rem" }}
              >
                <li className="nav-item" onClick={handleSeeProductOnCart}>
                  {activeSale.sellingProducts.map((card, index) => (
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
                  ))}
                </li>
              </ul>
            </div>
            <div className="saleDetails-fields">
              SubTotal:{" "}
              <em className="saleDetails-data">${activeSale.subTotal}</em>
            </div>
            <div className="saleDetails-fields">
              IVA: <em className="saleDetails-data">${activeSale.iva}</em>
            </div>
            <div className="saleDetails-fields">
              Tarifa de envio:{" "}
              <em className="saleDetails-data">${activeSale.regTariff}</em>
            </div>
            <div className="saleDetails-fields">
              Total: <em className="saleDetails-data">${activeSale.total}</em>
            </div>
          </div>
        </>
      );
      break;

    default:
      break;
  }
  return (
    <div className={`sidepanel ${isVisible ? "active" : ""}`}>
      {panelOption}
    </div>
  );
};

SidePanel.propTypes = {
  panelType: PropTypes.number,
  showSidePanel: PropTypes.bool,
  infoType: PropTypes.number,
};
