import PropTypes from "prop-types";
import { ContentList } from "../components/ContentList";

export const Collections = (props) => {
  const { showSidePanel, onToggleSidePanel } = props;
  
  return (
    <>
      <div className="product-matrix-container">
        <ContentList contentType="1" listType="1" showSidePanel={showSidePanel} onToggleSidePanel={onToggleSidePanel}/>
      </div>
    </>
  );
};

Collections.propTypes = {
  showSidePanel: PropTypes.bool,
  onToggleSidePanel: PropTypes.func
};
