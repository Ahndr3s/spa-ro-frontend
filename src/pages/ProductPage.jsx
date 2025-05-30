import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Slider } from "../components/Slider";
import { useProductStore } from "../hooks/useProductStore";
import { getContentById } from "../helpers/getContentById";
import { useCartStore } from "../hooks/useCartStore";
import { toggleSidePanel } from "../store/interactivePanels";
import "./ProductPageStyles.css";

export const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { type } = location.state || {};
  const { products, startLoadingProducts } = useProductStore();
  const { startSavingProductOnCart, startUpdatingProductQty } = useCartStore();
  const [sizesBtns, setSizeBtns] = useState([]);
  let content;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [updatedContent, setUpdatedContent] = useState(null);

  if (type === 1) {
    content = getContentById(type, products, id);
    // console.log("puedo alcanzar este state ", activeCostume);
    // console.log("-------------------------------------------");
    // console.log("puedo alcanzar estos datos ", content);
    // console.log("-------------------------------------------");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    startLoadingProducts();
  }, [startLoadingProducts]);

  useEffect(() => {
    if (!content.size) return;
    if (content.size === "1") {
      setSizeBtns(["T2", "T4", "T6", "T8", "T10", "T12"]);
    } else if (content.size === "2") {
      setSizeBtns([
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
  }, [content.size]);

  // Observa el cambio en `selectedSize`
  useEffect(() => {
    // console.log("Elegiste este tamaño: " + selectedSize);
    if (content && selectedSize) {
      // Crea una copia mutable del objeto `content` con el tamaño seleccionado
      setUpdatedContent({ ...content, size: selectedSize });
    }
  }, [selectedSize, content]);

  // ALLOWS THE USER TO CHOOSE THE SIZE OF THE PRODUCT
  const handleChooseSize = (size) => {
    setSelectedSize(size);
  };

  // ADDS A PRODUCT TO THE SHOPPING CART
  const handleAddOnCart = () => {
    if (!updatedContent) {
      Swal.fire("Error", "Elige un tamaño", "error");
      // console.error("No hay datos para agregar al carrito");
      return;
    }
    dispatch(toggleSidePanel());
    // console.dir(updatedContent);
    startSavingProductOnCart(updatedContent);
    startUpdatingProductQty();
    navigate(`/home`, {
      replace: true,
    });
  };

  return (
    <>
      <div className="product-container">
        <img className="product-card-img" src={content.img} />
        <div className="product-details">
          <h2>{content?.title}</h2>
          <h4>${content?.price}</h4>
          {content.type == 1 && (
            <>
                {/* <Slider type={2} cards={products} limit={3} cardType={2} /> */}
              <div className="tumb-prod-slider">
              </div>
              <h4>Tamaños Disponibles</h4>
              <div className="sizes-matrix">
                {sizesBtns.map((size) => (
                  <div
                    key={size}
                    className={`product-size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => handleChooseSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="product-btn">
            <button className="primary-btn-drk" onClick={handleAddOnCart}>
              Agregar al carrito
            </button>
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
        <Slider type={2} cards={products} limit={4} cardType={2} />
      </div>
    </>
  );
};
