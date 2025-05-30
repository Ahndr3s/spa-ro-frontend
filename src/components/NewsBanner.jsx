import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getContentsByType } from "../helpers/getContents";
import { ContentList } from "./ContentList";
import { Slider } from "./Slider";
import { useAuthStore } from "../hooks/useAuthStore";
import { useBannerStore } from "../hooks/useBannerStore";
import { useProductStore } from "../hooks/useProductStore";
import { useCategoryStore } from "../hooks/useCategoryStore";
import { useSalesStore } from "../hooks/useSalesStore";
import { toggleCreativeProdMode } from "../store/productSlice";
import { toggleCreateBannerMode } from "../store/bannerSlice";
import { toggleCreativeCatMode } from "../store/categorySlice";
import { toggleSidePanel } from "../store/interactivePanels";

export const NewsBanner = () => {
  const { products, startLoadingProducts } = useProductStore();
  const { banners, startLoadingBanners } = useBannerStore();
  const { startLoadingCategories } = useCategoryStore();
  const { startLoadingSales } = useSalesStore();
  const dispatch = useDispatch();
  const filtereBanners = getContentsByType(banners, "5");
  const accesories = getContentsByType(products, "2");
  const { status } = useAuthStore();

  useEffect(() => {
    startLoadingProducts();
    startLoadingBanners()
    startLoadingCategories()
    startLoadingSales()
  }, [startLoadingProducts, startLoadingBanners, startLoadingCategories, startLoadingSales]);

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
      {/* SLIDER DE BANNERS */}
      <Slider type={1} cards={filtereBanners} limit={3} cardType={2}/>
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
      
      <h1>The Best Sellers</h1>
      <div className="best-seller-container">
        <div className="top1">
          <ContentList contents={products} contentType="1" listType="1" limit={1} cardType={1}/>
        </div>
        <Slider type={2} cards={products} />
      </div>
      <h1>Accesorios</h1>
      <div className="best-seller-container">
        <div className="top1">
          <ContentList contents={accesories} contentType="2" listType="1" limit={1} cardType={1}/>
        </div>
        <Slider type={2} cards={accesories} />
      </div>
    </>
  );
};
