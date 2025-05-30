import PropTypes from "prop-types";
import { Card } from "./Card";
import { getContentsByType } from "../helpers/getContents";
import { getContentsByCategory } from "../helpers/getContentByCategory";

export const ContentList = (props) => {
  const contentsByType = getContentsByType(
    props.contents,
    props.contentType,
    props.limit
  );

  const contentsByCat = getContentsByCategory(
    props.contents,
    props.contentType,
    props.limit,
    props.category
  );
  
  const { showSidePanel } = props;
  let cardList = [];
  let combinedProps;
  let contents;

  const filteredContents =
  contentsByType.length !== 0 || contentsByCat.length !== 0
    ? [...contentsByType] // Clonamos los contenidos para evitar mutaciones accidentales
    : [...contentsByCat];

if (props.filterCollections === 1) {
  contents = filteredContents.filter((content) => contentsByCat.includes(content));
} else {
  contents = filteredContents;
}

  contents.forEach((content) => {
    // Definir las props específicas para '1', '2', '3', y '5'
    let additionalProps = {};

    if (props.contentType === "1") {
      // COSTUMES
      additionalProps = {
        info: content.info,
        size: content.size,
        price: content.price,
        category: content.category,
        stock: content.stock,
        // Más props específicas para COSTUMES
      };
    } else if (props.contentType === "2") {
      // ACCESORIES
      additionalProps = {
        info: content.info,
        size: content.size,
        price: content.price,
        category: content.category,
        stock: content.stock,
        // Más props específicas para ACCESORIES
      };
    } else if (props.contentType === "5") {
      // BANNERS
      additionalProps = {
        subtitle1: content.subtitle1,
        subtitle2: content.subtitle2,
        category: content.category,
        // Más props específicas para BANNERS
      };
    } else if (props.contentType === "7") {
      // BANNERS
      additionalProps = {
        saleDate: content.saleDate,
        clientName: content.clientName,
        clientEmail: content.clientName,
        sellingProducts: content.sellingProducts,
        contactAddress: content.contactAddress,
        subTotal: content.subTotal,
        regTariff: content.regTariff,
        iva: content.iva,
        total: content.total,

        // Más props específicas para BANNERS
      };
    }

    if (props.contentType !== 5) {
      // Combina las props generales con las props específicas
      combinedProps = {
        id: content.id,
        type: Number(props.contentType),
        title: content?.title,
        img: content?.img,
        ...additionalProps,
      };
    } else {
      combinedProps = props.childrenImgs;
    }

    // Agrega el componente Card a la lista
    cardList.push(
      <Card
        {...combinedProps}
        key={content.id}
        showSidePanel={showSidePanel}
        cardType={props.cardType}
      />
    );
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
  category: PropTypes.any,
  limit: PropTypes.number,
  filterCollections: PropTypes.number,
  listType: PropTypes.string,
  childrenImgs: PropTypes.array,
  showSidePanel: PropTypes.bool,
  onToggleSidePanel: PropTypes.func,
  cardType: PropTypes.number,
};
