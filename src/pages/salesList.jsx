import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSalesStore } from "../hooks/useSalesStore";
import {
  onCheckingSale,
  onSettiningDate,
  onSetActiveSale,
} from "../store/saleSlice";
import { Report } from "../components/Report";
import { onSetActiveProduct } from "../store/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./saleList.css";

export const SalesList = () => {
  const isLoadingSales = useSelector((state) => state.sale.isLoadingSales);
  const { sales, startLoadingSales, startLoadingMostSoldOfTheMonth } =
    useSalesStore();

  useEffect(() => {
    startLoadingSales();
  }, [startLoadingSales]);

  return (
    <>
      {isLoadingSales ? (
        <div className="spinner-custom">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="40x"
            className="custom-spin"
            style={{ color: `#808080`, paddingRight: "1rem" }}
          />
        </div>
      ) : (
        <Report
          records={sales}
          setActiveRecords={[onSetActiveSale, onSetActiveProduct]}
          onCheckingRecordsDetails={[onCheckingSale]}
          analyticsTools={[startLoadingMostSoldOfTheMonth, onSettiningDate]}
        />
      )}
    </>
  );
};
