import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faWhatsapp,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
const d = new Date();

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-headers">
          <div className="footer-list">
            <h3>Contacto</h3>
            <ul style={{ listStyle: "none", paddingLeft:"0"}}>
              <li className="footer-ls-elmnt">
                <div>
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="contact-icon"
                    size="1x"
                    style={{ color: `#808080` }}
                  />
                </div>
                Instagram
              </li>
              <li className="footer-ls-elmnt">
                <div>
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="contact-icon"
                    size="1x"
                    style={{ color: `#808080` }}
                  />
                </div>
                Whatsapp
              </li>
              <li className="footer-ls-elmnt">
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="contact-icon"
                    size="1x"
                    style={{ color: `#808080` }}
                  />
                </div>
                Facebook
              </li>
              <li className="footer-ls-elmnt">
                <div>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="contact-icon"
                    size="1x"
                    style={{ color: `#808080` }}
                  />
                </div>
                Álvaro Obregón 414, Zona Centro
              </li>
              <li className="footer-ls-elmnt">
                <div>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="contact-icon"
                    size="1x"
                    style={{ color: `#808080` }}
                  />
                </div>
                San Pedrito 541, Nueva Candelaria
              </li>
            </ul>
          </div>
          <div className="footer-list">
            <h3>Legal</h3>
          </div>
        </div>
        <div className="footer-final">
          <div>© Rossmina {d.getFullYear()}</div>
          <div className="footer-ls-elmnt">
            Made with
            <div>
              <FontAwesomeIcon
                icon={faHeart}
                className="love-icon"
                size="1x"
                style={{ color: `#808080` }}
              />
            </div>
            by Alphaxa
          </div>
        </div>
      </footer>
    </>
  );
};
