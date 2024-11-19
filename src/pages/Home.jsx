import PropTypes from "prop-types";
import { NewsBanner } from "../components/NewsBanner";
import "./HomeStyles.css";

export const Home = ({ onToggleSidePanel }) => {

  return (
    <>
      <NewsBanner onToggleSidePanel={onToggleSidePanel}/>  
    </>
  );
};

Home.propTypes = {
  onToggleSidePanel: PropTypes.any
};
