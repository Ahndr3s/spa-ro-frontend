import PropTypes from "prop-types";
import { getContentsByType } from "../helpers/getContents";
import { Card } from "./Card";

export const ContentList = (props) => {
    const contents = getContentsByType(props.contents, props.contentType, props.limit);
    const { showSidePanel, onToggleSidePanel } = props;
    let cardList = [];
    let combinedProps;
  
    contents.forEach((content) => {
      // Definir las props específicas para '2', '3', y '4'
      let additionalProps = {};
  
      if (props.contentType === "1") { // PRODUCTS 
        additionalProps = {        
          info: content.info,
          size: content.size,
          price: content.price,
          collection: content.collection,
          stock: content.stock,
          // Más props específicas para COURSES
        };
      } else if (props.contentType === "2") { // BANNER
        additionalProps = {      
          subtitle1: content.subtitle1,
          subtitle2: content.subtitle2,
          // Más props específicas para TEAM MEMBERS
        };
      } /*else if (props.contentType === "4") { //VIDEOS
        additionalProps = {
          url: content.url,
          // Más props específicas para VIDEOS
        };
      }*/
  
      if (props.contentType !== 5) {
        // Combina las props generales con las props específicas
        combinedProps = {
          id: content.id,
          type: Number(props.contentType),
          title: content.title,
          img: content.img,
          ...additionalProps,
        };
      } else {
        combinedProps = props.childrenImgs
      }
  
      // Agrega el componente Card a la lista
      cardList.push(<Card {...combinedProps} key={content.id} showSidePanel={showSidePanel} onToggleSidePanel={onToggleSidePanel} />);
  
    });
  
    // Si listType es '1', devuelve el array de componentes Card
    if (props.listType === "1") {
      // console.log(cardList)
      return cardList;
    }
  
    // En cualquier otro caso, renderiza los componentes Card directamente
    return <>{cardList}</>;
  };
  
  ContentList.propTypes = {
    contents: PropTypes.any,
    contentType: PropTypes.string,
    limit: PropTypes.number,
    listType: PropTypes.string,
    childrenImgs: PropTypes.array,
    showSidePanel: PropTypes.bool,
    onToggleSidePanel: PropTypes.func
  };