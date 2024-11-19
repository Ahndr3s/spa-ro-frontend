import "./ProductPageStyles.css";
import logo from "../../assets/logo.png";
import { Slider } from "../components/Slider";
// import { getContentsByType } from "../helpers/getContents";
// import { contents } from "../../assets/contents";
import { useEffect, useState } from "react";
import { useCostumeStore } from "../hooks/useCostumeStore";
import { useLocation, useParams } from "react-router-dom";
import { getContentById } from "../helpers/getContentById";
import { onUpdateCostumeSize } from "../store/costumeSlice";
import { useDispatch } from "react-redux";


export const ProductPage = () => {
  // const filteredData = getContentsByType(contents, "1");
  const { id } = useParams();
  const location = useLocation();
  const { type, onToggleSidePanel  } = location.state || {};
  const { costumes, startLoadingCostumes, activeCostume} = useCostumeStore()
  let content;
  const dispatch = useDispatch()

  if (type === 1) {
    content = getContentById(type, costumes, id);
    console.log('puedo alcanzar esto ',activeCostume)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    startLoadingCostumes();
  }, [startLoadingCostumes]);

    const [selectedSize, setSelectedSize] = useState(null);
  
    const handleChooseSize = (size) => {
      setSelectedSize(size);
      dispatch(onUpdateCostumeSize(size)); // Actualiza el tamaño en Redux
      // console.dir(activeCostume);
    };

    const handleAddOnCart = () => {
      if (typeof onToggleSidePanel === "function") {
        onToggleSidePanel();
      } else {
        console.error("onToggleSidePanel no está definido");
      }
      alert("Producto agregado al carrito");
    }

  return (
    <>
      <div className="product-container">
        <img className="product-card-img" src={logo} />
        <div className="product-details">
          <h2>{content?.title}</h2>
          <h4>${content?.price}</h4>
          <h5>Cantidad</h5>
          <div className="sizes-matrix">
          {['T2', 'T4', 'T6', 'T8', 'T10', 'T12'].map((size) => (
              <div
                key={size}
                className={`product-size-btn ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleChooseSize(size)}
              >
                {size}
              </div>
            ))}
          </div>

          <div className="product-btn">
            <button className="primary-btn-drk" onClick={handleAddOnCart}>Agregar al carrito</button>
          </div>

          <div className="product-info">
            <p>{content?.info}</p>
          </div>
          <div className="shipment-info">
            <h4>Información de Envíos</h4>
            <p>
              Al enviar a países fuera de México, se pueden generar impuestos o
              costos adicionales (por ejemplo, derechos de aduana) en el
              contexto de su pedido, los cuales no son pagados ni facturados por
              nosotros, sino por usted directamente a las autoridades aduaneras
              responsables o a las autoridades fiscales. Para detalles, por
              favor contacte a las autoridades relevantes.
            </p>
          </div>
        </div>
      </div>
      <div className="related-items">
        <h3>Productos Relacionados</h3>
        <Slider type={2} cards={costumes} limit={4} />
      </div>
    </>
  );
};
