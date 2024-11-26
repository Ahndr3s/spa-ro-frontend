import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toggleSidePanel } from "../store/SidePanelSlice";
import { useCostumeStore } from "../hooks/useCostumeStore";
import { useCartStore } from "../hooks/useCartStore";
import { Card } from "./Card";
import "../index.css";

export const SidePanel = ({ panelType }) => {
  let panelOption;
  const [Subtotal, setSubtotal] = useState(0);
  const { activeCostume } = useCostumeStore();
  const { cartCostumes } = useCartStore();
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.sidePanel.isVisible);

  const handleSeeProductOnCart = () => {
    dispatch(toggleSidePanel());
  };

  // Update subtotal whenever cartCostumes changes
  useEffect(() => {
    const total = cartCostumes.reduce(
      (acc, item) => acc + ((Number(item.price))* item.qty || 0),
      0
    );
    setSubtotal(total);
  }, [cartCostumes]);

  switch (panelType) {
    // PRODUCT LIST
    case 1:
      panelOption = (
        <div className={`sidepanel ${isVisible ? "active" : ""}`}>
          <div className="sidepanel-header-t1">
            <h3>Mi Carrito</h3>
          </div>
          <ul>
            <li className="nav-item" onClick={handleSeeProductOnCart}>
              {cartCostumes.map((card, index) => (
                <Card
                  id={card.id}
                  key={`t1${index}`}
                  type={3}
                  title={card.title}
                  img={card.img}
                  price={card.price}
                  size={card.size}
                  qty={card.qty}
                />
              ))}
            </li>
          </ul>
          <div className="sidepanel-footer">
            Subtotal: ${Subtotal}
            <button className="primary-btn-drk">Checkout</button>
          </div>
        </div>
      );
      break;

    // CART EMPTY
    case 2:
      panelOption = (
        <div className={`sidepanel ${isVisible ? "active" : ""}`}>
          <div className="sidepanel-header-t2">
            <h3>Mi Carrito</h3>
          </div>
          <div className="emptyMsg">
            <h2>Tu carrito está vacío :/</h2>
          </div>
        </div>
      );
      break;

    // PRODUCT RESUME
    case 3:
      panelOption = (
        <div className={`sidepanel ${isVisible ? "active" : ""}`}>
          <div className="sidepanel-header-t3">
            <h3>Agregar al Carrito</h3>
            <div className="x-contain" onClick={handleSeeProductOnCart}>
              <FontAwesomeIcon
                icon={faXmark}
                size="2x"
                style={{ color: `#fff` }}
              />
            </div>
          </div>
          <Card
            type={4}
            id={activeCostume.id}
            title={activeCostume.title}
            info={activeCostume.info}
            img={activeCostume.img}
            price={activeCostume.price}
            size={activeCostume.size}
          />
        </div>
      );
      break;

    default:
      break;
  }
  return <>{panelOption}</>;
};

SidePanel.propTypes = {
  panelType: PropTypes.number,
  showSidePanel: PropTypes.bool,
};
