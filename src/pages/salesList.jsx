import { useSalesStore } from "../hooks/useSalesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import "./saleList.css";
import { onCheckingSale } from "../store/saleSlice";
import { useDispatch } from "react-redux";
import { toggleSidePanel } from "../store/interactivePanels";

export const SalesList = () => {
  const { sales, setActiveSale } = useSalesStore();
  const dispatch = useDispatch()

  const handleShowSaleDetails = (sale) => {
    setActiveSale(sale)
    dispatch(onCheckingSale())
    dispatch(toggleSidePanel());
  };

  return (
    <>
      <h2>salesList</h2>

      <div className="salesHistoric">
        <table className="sales-table">
          <thead>
            <tr className="sales-hd-row">
              <th className="sales-table-hd">Id</th>
              <th className="sales-table-hd">Nombre</th>
              <th className="sales-table-hd">Fecha</th>
              <th className="sales-table-hd">Precio</th>
              <th className="sales-table-hd">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr className="sale-info-row" key={sale.id}>
                <td className="sale-data-td">{sale.id}</td>
                <td className="sale-data-td">{sale.clientName}</td>
                <td className="sale-data-td">{sale.saleDate}</td>
                <td className="sale-data-td">${sale.total}</td>
                <td className="sale-data-td">
                  <div
                    onClick={() => handleShowSaleDetails(sale)}
                  >
                    <FontAwesomeIcon
                      icon={faBookOpen}
                      size="2x"
                      style={{ color: `#000`, paddingRight: "1rem", justifyContent: 'space-around'}}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
