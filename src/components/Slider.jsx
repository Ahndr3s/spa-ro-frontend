import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "./Card";

export const Slider = ({ type, cards, limit, onToggleSidePanel }) => {
  const [card, setcard] = useState(0);
  const [currentSlide, setcurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  let index;
  let sliderOption;

  // Configurar un temporizador que cambia la diapositiva cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentSlide((prevSlide) => (prevSlide + 1) % cards.length);
    }, 2000);
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [cards.length]);

  // Función para cambiar a una diapositiva específica
  const goToSlide = (index) => {
    setcurrentSlide(index);
  };

  let onPreviousClick = () => {
    index = card === 0 ? cards.length - 1 : card - 1;
    setcard(index);
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  let onNextClick = () => {
    index = card === cards.length - 1 ? 0 : card + 1;
    setcard(index);
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };

  // Si se proporciona un límite, devuelve los últimos 'limit' registros
  if (limit !== undefined) {
    cards = cards.slice(-limit);
  }

  // AUTO BANNER SLIDER
  if (type === 1) {
    sliderOption = (
      <div className="slider">
        <div className="slides">
          {cards.map((card, index) => (
            <div
              key={`Sidet2${index}`}
              className={`slideT2 ${index === currentSlide ? "active" : ""}`}
            >
              <Card
                id={card.id}
                key={`t2${index}`}
                type={Number(card.type)}
                title={card.title}
                info={card.info}
                img={card.img}
                price={card.prince}
                size={card.size}
                subtitle1={card.subtitle1}
                subtitle2={card.subtitle2}
              />
            </div>
          ))}
        </div>

        {/* Puntos de navegación */}
        <div className="dots">
          {cards.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <style>{`
          .slides {
            display: flex;
            transition: transform 0.5s ease-in-out;
            transform: translateX(-${currentSlide * 100}%);
        }
        `}</style>
      </div>
    );
  } else if (type === 2) { // PRODUCT CARD SLIDER
    sliderOption = (
      <div className="slider-container">
        <FontAwesomeIcon
          className="slider-l-btn slider-btn"
          icon={faCircleChevronLeft}
          onClick={onPreviousClick}
        />
        <div ref={sliderRef} key={index} className="slide">
          {cards.map((card, index) => (
            <Card
            id={card.id}
            key={`t1${index}`}
            type={Number(card.type)}
            title={card.title}
            info={card.info}
            img={card.img}
            price={card.price}
            size={card.size}
            subtitle1={card.subtitle1}
            subtitle2={card.subtitle2}
            onToggleSidePanel={onToggleSidePanel}
            />
          ))}
        </div>
        <FontAwesomeIcon
          className="slider-btn slider-r-btn"
          icon={faCircleChevronRight}
          onClick={onNextClick}
        />
      </div>
    );
  }
  return <>{sliderOption}</>;
};

Slider.propTypes = {
  cards: PropTypes.any,
  type: PropTypes.number,
  limit: PropTypes.number,
  showSidePanel: PropTypes.bool,
  onToggleSidePanel: PropTypes.any
};
