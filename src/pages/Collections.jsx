import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { ContentList } from "../components/ContentList";
import { useProductStore } from "../hooks/useProductStore";
import { useCategoryStore } from "../hooks/useCategoryStore";
import { useForm } from "../hooks/useForm";
import "./CollectionsStyles.css";


export const Collections = () => {
  const { products } = useProductStore();
  const { categories } = useCategoryStore();
  const location = useLocation();
  const bannerCategory = location.state?.bannerCategory;
  // console.log(categories)
  // console.log(bannerCategory)
  
  // PRODUCT FORM FIELDS DEFINITION\
  const productFormFields = (info) => ({
    productType: info?.type || "1",
    productCategory: bannerCategory || info?.category || "6797fc0be780ae7d8b5e1467",
  });

  // Inicializar el estado del formulario con base en el tipo de formulario (product)
  const initialFields = productFormFields();

  const { formState, onSelectChange } = useForm(initialFields);
  // console.log(products)
  return (
    <>
      <div className="product-opts">
        <div className="select-container">
          <h4>Clase de Producto</h4>
          <select
            name="productType"
            id="sizes"
            className="form-sizes"
            onChange={onSelectChange}
            value={formState.productType}
          >
            <option key={`opt1`} value={"1"}>
              Disfraces
            </option>
            <option key={`opt2`} value={"2"}>
              Accesorios
            </option>
          </select>
        </div>
        <div className="select-container">
          <h4>Colecciones</h4>
          <select
            name="productCategory"
            id="categories"
            className="form-sizes"
            onChange={onSelectChange}
            value={formState.productCategory}
          >
            {categories.map((category) => (
              <option key={`opt${category.title}`} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-matrix-container">
        <ContentList
          contents={products}
          contentType={formState.productType}
          category={formState.productCategory}
          listType="1"
          cardType={1}
          filterCollections={1}
        />
      </div>
    </>
  );
};

Collections.propTypes = {
  showSidePanel: PropTypes.bool,
  onToggleSidePanel: PropTypes.func,
  bannerCategory: PropTypes.string,
};
