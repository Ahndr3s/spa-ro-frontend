import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toggleSearchPanel } from "../store/interactivePanels";
import { getContentByName } from "../helpers/getContentByName";
import { useProductStore } from "../hooks/useProductStore";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../hooks/useForm";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Card } from "./Card";

export const SearchPanel = () => {
  let cardOption;
  const isSearchPanelVisible = useSelector(
    (state) => state.interactivePanels.searchPanelVisible
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const { q = "" } = queryString.parse(location.search);
  const searches = getContentByName(q, products);

  const { searchText, onInputChange, onResetForm } = useForm({ searchText: q });
  const ShowSearch = q.length === 0;
  const ShowError = q.length > 0 && searches.length === 0;

  // SEARCHES FOR MATCHES WITH THE WIRITTEN TEXT
  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim().length <= 1) return;
    navigate(`?q=${searchText}`);
    onResetForm();
  };

  // CLOSES THE SEARCHING PANEL
  const handleCloseSearchPanel = () => {
    // onResetForm();
    navigate("");
    dispatch(toggleSearchPanel());
  };

  return (
    <div className={`searchPanel ${isSearchPanelVisible ? "active" : ""}`}>
      <div className="form-container">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <div className="searchIcon">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="2x"
              style={{ color: `#000` }}
            />
          </div>
          <input
            type="text"
            name="searchText"
            placeholder="Escribe cualquier cosa"
            value={searchText}
            onChange={onInputChange}
          />
        </form>
        <div className="x-contain" onClick={handleCloseSearchPanel}>
          <FontAwesomeIcon icon={faXmark} size="2x" style={{ color: `#000` }} />
        </div>
      </div>
      <div className="result-container">
        <div className="result-headers">
          <div
            className="search-res-pos"
            style={{ dispay: ShowSearch ? "" : "none" }}
          >
            Resultados de Búsqueda:
          </div>
          <div
            className="search-res-neg"
            style={{ display: ShowError ? "" : "none" }}
          >
            Contenido No Encontrado
          </div>
        </div>
        <div className="result-cards">
          {searches.map((content) => {
            cardOption = (
              <Card
                // style={{ marginLeft: "2rem" }}
                cardType={1}
                id={content.id}
                key={content.id}
                title={content.title}
                Coursedata={content.Coursedata}
                img={content.img}
                btntxt={content.btntxt}
                resume={content.resume}
                price={content.price}
              />
            );
            return cardOption;
          })}
        </div>
      </div>
    </div>
  );
};
