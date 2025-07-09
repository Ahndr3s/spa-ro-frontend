import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "../hooks/useForm";
import { toggleSidePanel } from "../store/interactivePanels";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

// LOGIN FORM FIELDS DEFINITION
const tableFormFields = {
  idFilter: "",
  nameFilter: "",
  dateFilter: "",
};

export const Report = ({
  records,
  setActiveRecords,
  onCheckingRecordsDetails,
  analyticsTools,
}) => {
  const dispatch = useDispatch();
  const [filteredRecords, setfilteredRecords] = useState(records);
  const totalSum = filteredRecords.reduce(
    (acc, record) => acc + Number(record.total),
    0
  );
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // TRIGGERS LOGIN REQUEST AND NAVIGATES TO HOME PAGE
  const handleTableFilter = async (e) => {
    // analyticsTools[1]()
    if (e.keyCode === 13 && !e.shiftKey) {
      // Convertir YYYY-MM-DD a DD/MM/YYYY
      let formattedDate = "";
      if (dateFilter) {
        const [year, month, day] = dateFilter.split("-");
        formattedDate = `${day}/${month}/${year}`;
      }

      const filtered = records.filter((record) => {
        const matchesId =
          idFilter === "" || record.id.toString().includes(idFilter);
        const matchesName =
          nameFilter === "" ||
          record?.clientName.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesDate =
          formattedDate === "" || record.saleDate.startsWith(dateFilter);

        return matchesId && matchesName && matchesDate;
      });
      setfilteredRecords(filtered);
      setFormState("");
    }
  };

  const handleShowSaleDetails = (sale) => {
    // setActiveRecords[0](sale);
    dispatch(setActiveRecords[0](sale));
    dispatch(onCheckingRecordsDetails[0]());
    dispatch(toggleSidePanel());
  };

  const handleMostSold = () => {
    dispatch(analyticsTools[1]());
    dispatch(toggleSidePanel());
  };

  const handleReset = () => {
    setfilteredRecords(records);
    setCurrentPage(1);
  };

  // GETS TABLE FILTERS FIELDS VALUES
  const {
    idFilter,
    nameFilter,
    dateFilter,
    onInputChange: onTableInputChange,
    setFormState,
  } = useForm(tableFormFields);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // const goToPage = (pageNumber) => {
  //   if (pageNumber >= 1 && pageNumber <= totalPages) {
  //     setCurrentPage(pageNumber);
  //   }
  // };

  useEffect(() => {
    setfilteredRecords(records);
    setCurrentPage(1);
  }, [records]);

  return (
    <>
      <div className="stats-tools">
        <button className="serv-btn" onClick={handleReset}>
          Borrar Filtro
        </button>
        <button className="serv-btn" onClick={handleMostSold}>
          Obtener Producto del Mes
        </button>
      </div>
      <div className="salesHistoric">
        <table className="sales-table">
          <thead>
            <tr className="sales-hd-row">
              <th className="sales-table-hd">
                Id
                <input
                  type="text"
                  name="idFilter"
                  placeholder="Id de vta"
                  value={idFilter || ""}
                  onChange={onTableInputChange}
                  onKeyDown={(e) => handleTableFilter(e, idFilter, 1)}
                />
              </th>
              <th className="sales-table-hd">
                Nombre
                <input
                  type="text"
                  name="nameFilter"
                  placeholder="Nombre de cliente"
                  value={nameFilter || ""}
                  onChange={onTableInputChange}
                  onKeyDown={(e) => handleTableFilter(e, nameFilter, 2)}
                />
              </th>
              <th className="sales-table-hd">
                Fecha
                <input
                  type="date"
                  name="dateFilter"
                  placeholder="Fecha de vta"
                  value={dateFilter || ""}
                  onChange={onTableInputChange}
                  onKeyDown={(e) => handleTableFilter(e, dateFilter, 3)}
                />
              </th>
              <th className="sales-table-hd">Precio</th>
              <th className="sales-table-hd">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((record) => (
              <tr className="sale-info-row" key={record.id}>
                <td className="sale-data-td">{record.id}</td>
                <td className="sale-data-td">{record.clientName}</td>
                <td className="sale-data-td">
                  {record.saleDate.split("T")[0]}
                </td>
                <td className="sale-data-td">${record.total}</td>
                <td className="sale-data-td">
                  <div onClick={() => handleShowSaleDetails(record)}>
                    <FontAwesomeIcon
                      icon={faBookOpen}
                      size="2x"
                      style={{
                        color: `#000`,
                        paddingRight: "1rem",
                        justifyContent: "space-around",
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            <tr className="sale-info-row total-row">
              <td colSpan="3"></td>
              <td className="sale-data-td total-cell">
                <strong>Total: ${totalSum.toFixed(2)}</strong>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

      </div>
        {
          records.length >= 10 && (

        <div className="pagination">
          <FontAwesomeIcon
            className="report-btn"
            icon={faCircleChevronLeft}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />

          {/* {[...Array(totalPages).keys()].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx + 1)}
              className={`btnIndex ${currentPage === idx + 1 ? "active-page" : ""}`}
            >
              {idx + 1}
            </button>
          ))} */}

          <FontAwesomeIcon
            className="report-btn"
            icon={faCircleChevronRight}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </div>
          )
        }
    </>
  );
};

Report.propTypes = {
  records: PropTypes.array,
  setActiveRecords: PropTypes.array,
  onCheckingRecordsDetails: PropTypes.array,
  analyticsTools: PropTypes.array,
  resetReport: PropTypes.array,
};
