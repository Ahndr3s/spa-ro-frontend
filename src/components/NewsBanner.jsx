import PropTypes from "prop-types";
import { ContentList } from "./ContentList";
import { Slider } from "./Slider";
import { contents } from "../../assets/contents";
import { getContentsByType } from "../helpers/getContents";
import { useCostumeStore } from "../hooks/useCostumeStore";
import { useEffect } from "react";

// export const NewsBanner = (props) => {
export const NewsBanner = ({ onToggleSidePanel }) => {
  const filtereBanners = getContentsByType(contents, "2");
  const { costumes, startLoadingCostumes  } = useCostumeStore()
  // const { showSidePanel, onToggleSidePanel } = props;

  useEffect(() => {
    startLoadingCostumes();
  }, [startLoadingCostumes]);

  return (
    <>
      <Slider type={1} cards={filtereBanners} limit={3} />
      {/* <Slider type={1} cards={costumes} limit={3} /> */}
      <h1>The Best Sellers</h1>
      <div className="best-seller-container">
        <div className="top1">
          <ContentList contentType="1" listType="1" limit={1} />
        </div>
        <Slider type={2} cards={costumes} 
          onToggleSidePanel={onToggleSidePanel} />
      </div>
    </>
  );
};

NewsBanner.propTypes = {
  onToggleSidePanel: PropTypes.any
};
