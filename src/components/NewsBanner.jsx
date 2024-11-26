import { useEffect } from "react";
import { useCostumeStore } from "../hooks/useCostumeStore";
import { getContentsByType } from "../helpers/getContents";
import { ContentList } from "./ContentList";
import { Slider } from "./Slider";
import { contents } from "../../assets/contents";

export const NewsBanner = () => {
  const filtereBanners = getContentsByType(contents, "2");
  const { costumes, startLoadingCostumes } = useCostumeStore();

  useEffect(() => {
    startLoadingCostumes();
  }, [startLoadingCostumes]);

  return (
    <>
      {/* SLIDER DE BANNERS */}
      <Slider type={1} cards={filtereBanners} limit={3} />
      <h1>The Best Sellers</h1>
      <div className="best-seller-container">
        <div className="top1">
          <ContentList contentType="1" listType="1" limit={1} />
        </div>
        <Slider type={2} cards={costumes} />
      </div>
    </>
  );
};

