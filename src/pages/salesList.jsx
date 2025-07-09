import { useSalesStore } from "../hooks/useSalesStore";
import { onCheckingSale, onSettiningDate, onSetActiveSale } from "../store/saleSlice";
import { Report } from "../components/Report";
import { onSetActiveProduct } from "../store/productSlice";
import "./saleList.css";


export const SalesList = () => {
  const {
    sales,
    startLoadingMostSoldOfTheMonth,
  } = useSalesStore();

  return (
    <>
      <Report
        records={sales}
        setActiveRecords={[onSetActiveSale, onSetActiveProduct ]}
        onCheckingRecordsDetails={[onCheckingSale]}
        analyticsTools = {[startLoadingMostSoldOfTheMonth, onSettiningDate]}
      />
    </>
  );
};
