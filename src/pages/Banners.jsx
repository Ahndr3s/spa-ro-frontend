import { ContentList } from "../components/ContentList";
import { useBannerStore } from "../hooks/useBannerStore";

export const Banners = () => {
  const { banners } = useBannerStore();
  // console.log(banners)

  return (
    <>
      <div className="product-matrix-container">
        <ContentList
          contents={banners}
          contentType={"5"}
          listType="1"
          cardType={5}
        />
      </div>
    </>
  );
};
