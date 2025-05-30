import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  onSetActiveProduct,
  onUpdateCostumeSize,
  toggleCreativeProdMode,
  toggleDeletingProdMode,
} from "../store/productSlice";
import {
  onSetActiveProductOnCart,
  onUpdateQtyProductsOnCart,
} from "../store/cartSlice";
import {
  toggleCreateBannerMode,
  onSetActiveBanner,
  toggleDeletingBannerMode,
} from "../store/bannerSlice";
import { useProductStore } from "../hooks/useProductStore";
import { useCartStore } from "../hooks/useCartStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { toggleSidePanel } from "../store/interactivePanels";
import {
  onSetActiveCategory,
  toggleCreativeCatMode,
  toggleDeletingCatMode,
} from "../store/categorySlice";
import Swal from "sweetalert2";

export const Card = (props) => {
  let cardOption;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chooseSize, setchooseSize] = useState(null);
  const [sizesOpts, setSizeOpts] = useState([]);
  const { activeProduct } = useProductStore();
  const {
    startSavingProductOnCart,
    startDeletingProductOnCart,
    startUpdatingProductQty,
  } = useCartStore();
  const { status } = useAuthStore();

  useEffect(() => {
    if (!props.size) return;
    if (props.size === "1") {
      setSizeOpts(["T2", "T4", "T6", "T8", "T10", "T12"]);
    } else if (props.size === "2") {
      setSizeOpts([
        "T2",
        "T4",
        "T6",
        "T8",
        "T10",
        "T12",
        "T14",
        "T16",
        "T18",
        "T20",
      ]);
    }
  }, [props.size]);

  // PRODUCT WINDOW FROM CARD SLIDER
  const handleClickProductDetails = (props) => {
    navigate(`/productPage/${props.id}`, {
      replace: true,
      state: { type: props.cardType },
    });
  };

  // LEADS TO PRODUCT PAGE FROM THE SIDEPANEL
  const handleClickLearnMore = (props) => {
    dispatch(onSetActiveProduct(props));
    dispatch(toggleSidePanel());
    navigate(`/productPage/${props.id}`, {
      replace: true,
      state: { type: props.cardType },
    });
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN PRODUCT RESUME
  const handleResumeProduct = (e) => {
    e.stopPropagation();
    dispatch(toggleSidePanel());
    // console.log(props);
    dispatch(onSetActiveProduct(props));
  };

  // ADD PRODUCT TO CART FROM SIDEPANEL
  const handleAddProductToCart = () => {
    dispatch(toggleSidePanel());
    // console.log(props)
    if (props.size.includes("T")) {
      startSavingProductOnCart({ id: props.id, qty: 1, ...props });
    } else {
      Swal.fire("Error", "Elige un tamaño", "error");
    }
    startUpdatingProductQty();
    dispatch(onSetActiveProduct({}));
  };

  // REMOVE PRODUCT FROM CART
  const handleDeleteProductOnCart = (e, props) => {
    e.stopPropagation();
    dispatch(onSetActiveProductOnCart(props));
    startDeletingProductOnCart();
    startUpdatingProductQty();
  };

  // SELECT COSTUME SIZE FROM SIDEPANEL
  const handleChooseSize = (sizeTag) => {
    setchooseSize(sizeTag);
    dispatch(onUpdateCostumeSize(sizeTag)); // Actualiza el tamaño en Redux
    // console.dir(sizeTag);
  };

  // SELECT QTY OF COSTUMES
  const handleSelectQty = (e) => {
    const selectedQty = parseInt(e.target.value, 10);
    dispatch(onUpdateQtyProductsOnCart({ id: props.id, qty: selectedQty }));
    startUpdatingProductQty();
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN PRODUCT TO EDIT
  const handleEditProduct = (e) => {
    e.stopPropagation();
    dispatch(toggleCreativeProdMode());
    dispatch(toggleSidePanel());
    dispatch(onSetActiveProduct(props));
    // console.log(props)
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN PRODUCT TO DELETE
  const handleDeleteProduct = (e) => {
    e.stopPropagation();
    dispatch(toggleDeletingProdMode());
    dispatch(toggleSidePanel());
    dispatch(onSetActiveProduct(props));
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN BANNER TO EDIT
  const handleEditBanner = (e) => {
    e.stopPropagation();
    dispatch(toggleCreateBannerMode());
    dispatch(toggleSidePanel());
    dispatch(onSetActiveBanner(props));
    // console.log(props)
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN BANNER TO DELETE
  const handleDeleteBanner = (e) => {
    e.stopPropagation();
    dispatch(toggleDeletingBannerMode());
    dispatch(toggleSidePanel());
    dispatch(onSetActiveBanner(props));
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN CATEGORY TO EDIT
  const handleEditCategory = (e) => {
    e.stopPropagation();
    dispatch(toggleCreativeCatMode());
    dispatch(toggleSidePanel());
    dispatch(onSetActiveCategory(props));
    // console.log(props)
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN CATEGORY TO DELETE
  const handleDeleteCategory = (e) => {
    e.stopPropagation();
    dispatch(toggleDeletingCatMode());
    dispatch(toggleSidePanel());
    dispatch(onSetActiveCategory(props));
  };

  // SHOWS SIDEPANEL WITH THE CHOOSEN CATEGORY TO DELETE
  const handleClickBanner = () => {
    navigate(`/collections`, {
      replace: true,
      state: { type: props.cardType, bannerCategory: props.category },
    });
  };

  switch (props.cardType) {
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
          <img className="product-card-img" src={props.img} />
          <div className="btn-container">
            {status !== "Authenticated" && (
              <div className="icon-btn" onClick={handleResumeProduct}>
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
            )}
            {status === "Authenticated" && (
              <>
                <div className="icon-btn" onClick={handleEditProduct}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="2x"
                    style={{
                      color: `#fff`,
                      paddingLeft: "2rem",
                      marginBottom: "1rem",
                    }}
                  />
                </div>
                <div className="icon-btn" onClick={handleDeleteProduct}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="2x"
                    style={{ color: `#fff`, paddingLeft: "2rem" }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="product-card-footer">
            <h4 className="product-title">{props.title}</h4>
            <h5 className="product-size">{props.size}</h5>
            <h5 className="product-price">$ {props.price}</h5>
          </div>
        </div>
      );
      break;

    // BANNER DISPLAY CARD
    case 2:
      cardOption = (
        <div
          className="banner-card"
          style={{ backgroundImage: `url(${props.img})` }}
        >
          <div className="banner-card-info">
            <h1 className="banner-title">{props.title}</h1>
            <h3 className="banner-subtitle1">{props.subtitle1}</h3>
            <h2 className="banner-subtitle2">{props.subtitle2}</h2>
            <button className="primary-btn-drk" onClick={handleClickBanner}>
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
          onClick={(e) => {
            // Evitar que el evento se ejecute si el target es el select
            if (e.target.tagName === "SELECT" || e.target.closest(".qty")) {
              handleClickProductDetails({
                ...props,
                id: props.id,
                user: props.user,
                type: 1,
              });
            }
          }}
        >
          <img className="cart-card-img" src={props.img} id="cart-card-img" />
          <div className="cart-card-info" id="cart-card-info">
            <h4 className="product-title" id="product-title">
              {props.title}
            </h4>
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
            <select
              className="qty"
              name="qty"
              id="qty"
              onClick={(e) => {
                e.stopPropagation(); // Detenemos la propagación
              }}
              onChange={handleSelectQty}
              value={props.qty || 1} // Muestra el valor actual de `qty`
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={`opt${num}`} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
      break;

    // PRODUCT RESUME CARD
    case 4:
      cardOption = (
        <div className="product-resume">
          <img className="product-resume-img" src={props.img} />
          <div className="resume-card-info">
            <h4 className="product-res-title">{activeProduct?.title || ""}</h4>
            <h5 className="product-res-price">${activeProduct?.price || ""}</h5>
          </div>
          {activeProduct.type === 1 && (
            <>
              <div className="sizes-res-matrix">
                {sizesOpts.map((sizeTag) => (
                  <div
                    key={`${activeProduct.id}.${sizeTag}`}
                    className={`res-size-btn ${
                      chooseSize === sizeTag ? "selected" : ""
                    }`}
                    onClick={() => handleChooseSize(sizeTag)}
                    // onClick={() => alert(sizeTag)}
                  >
                    {sizeTag}
                  </div>
                ))}
              </div>
            </>
          )}
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
                  id: activeProduct?.id,
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

    // BANNER RESUME CARD
    case 5:
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
          <img className="product-card-img" src={props.img} />
          <div className="btn-container">
            {status === "Authenticated" && (
              <>
                <div className="icon-btn" onClick={handleEditBanner}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="2x"
                    style={{
                      color: `#fff`,
                      paddingLeft: "2rem",
                      marginBottom: "1rem",
                    }}
                  />
                </div>
                <div className="icon-btn" onClick={handleDeleteBanner}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="2x"
                    style={{ color: `#fff`, paddingLeft: "2rem" }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="product-card-footer">
            <h4 className="product-title">{props.title}</h4>
          </div>
        </div>
      );
      break;

    // CATEGORY CARD
    case 6:
      cardOption = (
        <div className="cart-card">
          <div className="cart-card-info" id="cart-card-info">
            <h4 className="product-title" id="product-title">
              {props.title}
            </h4>
          </div>
          <div className="cart-card-actions">
            <div
              className="cart-edit-container"
              onClick={(e) => handleEditCategory(e, props)}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="1x"
                style={{ color: `#000`, paddingLeft: "1rem" }}
              />
            </div>
            <div
              className="cart-eraser-container"
              onClick={(e) => handleDeleteCategory(e, props)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="1x"
                style={{ color: `#000`, paddingLeft: "1rem" }}
              />
            </div>
          </div>
        </div>
      );
      break;

    // SALE CARD
    case 7:
      cardOption = (
        <div className="sale-card">
          <div className="sale-card-info" id="sale-card-info">
            <h4 className="client-name" id="cient-name">
              {props.clientName}
            </h4>
            <h4 className="client-name" id="cient-name">
              {props.saleDate}
            </h4>
          </div>
          <div className="cart-card-actions">
            <div
              className="cart-edit-container"
              onClick={(e) => handleEditCategory(e, props)}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="1x"
                style={{ color: `#000`, paddingLeft: "1rem" }}
              />
            </div>
            <div
              className="cart-eraser-container"
              onClick={(e) => handleDeleteCategory(e, props)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="1x"
                style={{ color: `#000`, paddingLeft: "1rem" }}
              />
            </div>
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
  cardType: PropTypes.number,
  title: PropTypes.string,
  img: PropTypes.string,
  size: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.string,
  subtitle1: PropTypes.string,
  subtitle2: PropTypes.string,
  clientName: PropTypes.string,
  saleDate: PropTypes.string,
  setcostumeQty: PropTypes.any,
  user: PropTypes.any,
  qty: PropTypes.any,

};
