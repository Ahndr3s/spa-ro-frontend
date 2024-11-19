import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import "./AboutStyles.css";

export const About = () => {
  const instagramUrl = "https://www.instagram.com/iatutores/";
  const facebookUrl = "https://www.facebook.com/iatutores?mibextid=ZbWKwL";
  const youtubekUrl = "https://www.youtube.com/@IATutores";

  return (
    <>
      <div className="about-header">
        <div className="about-titles">
          <h2 className="about-title">Sobre Nosotros</h2>
          <h3 className="about-subtitle">
            Los disfraces más bonitos del bajío
          </h3>
        </div>
        <div className="socials">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              color="#000"
              style={{ marginLeft: "1rem" }}
            />
          </a>
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              color="#000"
              style={{ marginLeft: "1rem" }}
            />
          </a>
          <a href={youtubekUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="2x"
              color="#000"
              style={{ marginLeft: "1rem" }}
            />
          </a>
        </div>
      </div>
      <div className="about-container">
        <p className="about-text">
          Con más de 20 años de experiencia y ampliamente reconocidos por
          nuestro compromiso con el cliente y la calidad de nuestros productos.
          Ahora <b>Creaciones Paola</b> se reinventa para expandirnos y crear
          nuevas experiencias para todos.
        </p>
        <p className="about-text">
          Acompañanos en esta nueva étapa de creación y reinvención, permitenos
          compartir contigo más momentos inolvidables, muchas gracias por tu
          confianza y preferencia.
        </p>
      </div>
      <h2 className="about-title">Ubicación</h2>
      {/* TODO: USAR SNIPPET DE MAPA SEÑALANDO LA TIENDA */}
    </>
  );
};
