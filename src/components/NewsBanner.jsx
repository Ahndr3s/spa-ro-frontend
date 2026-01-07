import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContentsByType } from "../helpers/getContents";
import { ContentList } from "./ContentList";
import { Slider } from "./Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../hooks/useAuthStore";
import { useBannerStore } from "../hooks/useBannerStore";
import { useProductStore } from "../hooks/useProductStore";
import { useCategoryStore } from "../hooks/useCategoryStore";
import { toggleCreativeProdMode } from "../store/productSlice";
import { toggleCreateBannerMode } from "../store/bannerSlice";
import { toggleCreativeCatMode } from "../store/categorySlice";
import { toggleSidePanel } from "../store/interactivePanels";

export const NewsBanner = () => {
  const { products, startLoadingProducts } = useProductStore();
  const { banners, startLoadingBanners } = useBannerStore();
  const { startLoadingCategories } = useCategoryStore();
  const dispatch = useDispatch();
  const filtereBanners = getContentsByType(banners, "5");
  const accesories = getContentsByType(products, "2");
  const costumes = getContentsByType(products, "1");
  const { status } = useAuthStore();
  const isLoadingProducts = useSelector(
    (state) => state.product.isLoadingProducts
  );
  const isLoadingBanners = useSelector(
    (state) => state.banner.isLoadingBanners
  );

  useEffect(() => {
    startLoadingProducts();
    startLoadingBanners();
    startLoadingCategories();
  }, [startLoadingProducts, startLoadingBanners, startLoadingCategories]);

  const handleCreateProduct = () => {
    dispatch(toggleSidePanel());
    dispatch(toggleCreativeProdMode());
    // console.log(products)
  };

  const handleCreateBanner = () => {
    dispatch(toggleSidePanel());
    dispatch(toggleCreateBannerMode());
  };

  const handleCreateCategory = () => {
    dispatch(toggleSidePanel());
    dispatch(toggleCreativeCatMode());
  };

  return (
    <>
      {isLoadingProducts || isLoadingBanners ? (
        <div className="spinner-custom">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="40x"
            className="custom-spin"
            style={{ color: `#808080`, paddingRight: "1rem" }}
          />
        </div>
      ) : (
        <>
          <Slider type={1} cards={filtereBanners} limit={3} cardType={2} />
          {status === "Authenticated" && (
            <>
              <div className="crud-btn">
                <button className="serv-btn" onClick={handleCreateProduct}>
                  Crear Producto
                </button>
                <button className="serv-btn" onClick={handleCreateBanner}>
                  Crear Banner
                </button>
                <button className="serv-btn" onClick={handleCreateCategory}>
                  Crear Coleccion
                </button>
              </div>
            </>
          )}
          <div className="product-exhibit">
            <div className="best-seller-container">
              <h1>The Best Sellers</h1>
              <div className="best-seller-cards">
                <div className="top1">
                  <ContentList
                    contents={products}
                    contentType="1"
                    listType="1"
                    limit={1}
                    cardType={1}
                  />
                </div>
                <Slider type={2} cards={products} limit={8} />
              </div>
            </div>
            <div className="best-seller-container">
              <h1>Disfraces</h1>
              <div className="best-seller-cards">
                <div className="top1">
                  <ContentList
                    contents={costumes}
                    contentType="1"
                    listType="1"
                    limit={1}
                    cardType={1}
                  />
                </div>
                <Slider type={2} cards={costumes} limit={8} />
              </div>
            </div>
            <div className="best-seller-container">
              <h1>Accesorios</h1>
              <div className="best-seller-cards">
                <div className="top1">
                  <ContentList
                    contents={accesories}
                    contentType="2"
                    listType="1"
                    limit={1}
                    cardType={1}
                  />
                </div>
                <Slider type={2} cards={accesories} limit={8} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
