import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { onSetActiveCostume, onUpdateCostumeSize } from "../store/costumeSlice";
import { onSetActiveCostumeOnCart } from "../store/cartSlice";
import { useCostumeStore } from "../hooks/useCostumeStore";
import { useCartStore } from "../hooks/useCartStore";

export const Card = (props) => {
  // console.log("Props in Card:", props);
  let cardOption;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onToggleSidePanel } = props;
  const { activeCostume } = useCostumeStore();
  const {
    startSavingCostumeOnCart,
    startDeletingCostumeOnCart,
  } = useCartStore();
  const [chooseSize, setchooseSize] = useState(null)

  // PRODUCT WINDOW FROM SLIDER
  const handleClickProductDetails = (props) => {
    dispatch(onSetActiveCostume(props));
    navigate(`/productPage/${props.id}`, {
      replace: true,
      state: { type: props.type, onToggleSidePanel  },
    });
  };

  // PRODUCT WINDOW FROM PANEL
  const handleClickLearnMore = (props) => {
    dispatch(onSetActiveCostume(props));

    if (typeof onToggleSidePanel === "function") {
      onToggleSidePanel();
    } else {
      console.error("onToggleSidePanel is not defined");
    }
    navigate(`/productPage/${props.id}`, {
      replace: true,
      state: { type: props.type },
    });
  };

  // DEPLOY SIDEPANEL
  const handleAddProduct = (e) => {
    e.stopPropagation();
    onToggleSidePanel();
    dispatch(onSetActiveCostume(props));
  };

  // ADD PRODUCT TO CART FROM SIDEPANEL
  const handleAddProductToCart = () => {
    // dispatch(onSetActiveCostume(props));
    onToggleSidePanel();
    startSavingCostumeOnCart(props);
  };

  // REMOVE PRODUCT FROM CART
  const handleDeleteProductOnCart = (e, props) => {
    e.stopPropagation();
    dispatch(onSetActiveCostumeOnCart(props));
    startDeletingCostumeOnCart();
  };

  // SELECT COSTUME SIZE FROM SIDEPANEL
  const handleChooseSize = (size) => {
    setchooseSize(size);
    dispatch(onUpdateCostumeSize(size)); // Actualiza el tamaño en Redux
    // console.dir(activeCostume);
  };

  switch (props.type) {
    // PRODUCT CARD
    case 1:
      cardOption = (
        <div
          className="product-card"
          onClick={() =>
            handleClickProductDetails({
              ...props,
              id: props.id,
              user: props.user,
            })
          }
        >
          <img className="product-card-img" src={logo} />
          <div className="btn-container">
            <div className="icon-btn" onClick={handleAddProduct}>
              <FontAwesomeIcon
                icon={faPlus}
                size="2x"
                style={{
                  color: `#fff`,
                  paddingLeft: "2rem",
                  marginBottom: "1rem",
                }}
              />
            </div>
            <div className="icon-btn">
              <FontAwesomeIcon
                icon={faTrash}
                size="2x"
                style={{ color: `#fff`, paddingLeft: "2rem" }}
              />
            </div>
          </div>
          <div className="product-card-footer">
            <h4 className="product-title">{props.title}</h4>
            <h5 className="product-size">{props.size}</h5>
            <h5 className="product-price">$ {props.price}</h5>
          </div>
        </div>
      );
      break;

    // BANNER CARD
    case 2:
      cardOption = (
        <div className="banner-card">
          <img className="banner-card-img" src={logo} />
          <div className="banner-card-info">
            <h1 className="banner-title">{props.title}</h1>
            <h3 className="banner-subtitle1">{props.subtitle1}</h3>
            <h2 className="banner-subtitle2">{props.subtitle2}</h2>
            <button className="primary-btn-drk" onClick={() => alert("Whoosh")}>
              Ver Más
            </button>
          </div>
        </div>
      );
      break;

    // PRODUCT MINI CARD
    case 3:
      cardOption = (
        <div
          className="cart-card"
          onClick={() =>
            handleClickProductDetails({
              ...props,
              id: props.id,
              user: props.user,
              type: 1,
            })
          }
        >
          <img className="cart-card-img" src={logo} />
          <div className="cart-card-info">
            <h4 className="product-title">{props.title}</h4>
            <h5 className="product-size">{props.size}</h5>
            <h5 className="product-price">${props.price}</h5>
          </div>
          <div className="cart-card-actions">
            <div
              className="cart-eraser-container"
              onClick={(e) => handleDeleteProductOnCart(e, props)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="1x"
                style={{ color: `#fff`, paddingLeft: "1rem" }}
              />
            </div>
            <select className="qty" name="qty" id="qty">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
      );
      break;

    // PRODUCT RESUME CARD
    case 4:
      cardOption = (
        <div className="product-resume">
          <img className="product-resume-img" src={logo} />
          <div className="resume-card-info">
            <h4 className="product-res-title">{activeCostume?.title || ""}</h4>
            <h5 className="product-res-price">${activeCostume?.price || ""}</h5>
          </div>
          <div className="sizes-res-matrix">
          {['T2', 'T4', 'T6', 'T8', 'T10', 'T12'].map((size) => (
              <div
                key={size}
                className={`res-size-btn ${chooseSize === size ? 'selected' : ''}`}
                onClick={() => handleChooseSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
          <div className="resume-footer">
            <button
              className="primary-btn-drk"
              onClick={handleAddProductToCart}
            >
              Agregar al Carrito
            </button>
            <button
              className="primary-btn-drk"
              onClick={() =>
                handleClickLearnMore({
                  ...props,
                  id: activeCostume?.id,
                  user: props?.user,
                  type: 1,
                })
              }
            >
              Ver Más
            </button>
          </div>
        </div>
      );
      break;

    default:
      break;
  }
  return <>{cardOption}</>;
};

Card.propTypes = {
  id: PropTypes.string,
  type: PropTypes.number,
  title: PropTypes.string,
  size: PropTypes.string,
  price: PropTypes.string,
  subtitle1: PropTypes.string,
  subtitle2: PropTypes.string,
  user: PropTypes.any,
  onToggleSidePanel: PropTypes.any,
};
