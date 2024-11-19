import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import { useCostumeStore } from "../hooks/useCostumeStore";
import { Card } from "./Card";
import { useCartStore } from "../hooks/useCartStore";

export const SidePanel = ({ panelType, showSidePanel, onToggleSidePanel }) => {
  let panelOption;
  const { activeCostume } = useCostumeStore();
  const { cartCostumes } = useCartStore();

  switch (panelType) {
    // PRODUCT LIST
    case 1:
      panelOption = (
        <div className={`sidepanel ${showSidePanel ? "active" : ""}`}>
          <div className="sidepanel-header-t1">
            <h3>Mi Carrito</h3>
          </div>
          <ul>
            <li className="nav-item" onClick={onToggleSidePanel}>
              {cartCostumes.map((card, index) => (
                <Card
                  id={card.id}
                  key={`t1${index}`}
                  type={3}
                  title={card.title}
                  img={card.img}
                  price={card.price}
                  size={card.size}
                  onToggleSidePanel={onToggleSidePanel}
                />
              ))}
            </li>
          </ul>
          <div className="sidepanel-footer">
            Subtotal: $460
            <button className="primary-btn-drk">Checkout</button>
          </div>
        </div>
      );
      break;

    // CART EMPTY
    case 2:
      panelOption = (
        <div className={`sidepanel ${showSidePanel ? "active" : ""}`}>
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
        <div className={`sidepanel ${showSidePanel ? "active" : ""}`}>
          <div className="sidepanel-header-t3">
            <h3>Agregar al Carrito</h3>
            <div className="x-contain" onClick={() => onToggleSidePanel(true)}>
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
            onToggleSidePanel={onToggleSidePanel}
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
  onToggleSidePanel: PropTypes.any,
};
