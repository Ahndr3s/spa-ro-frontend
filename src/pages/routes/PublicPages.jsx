import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { Home } from "../Home";
import { Collections } from "../Collections";
import { CheckoutPage } from "../CheckoutPage.jsx";
import { About } from "../About.jsx";
import { Contact } from "../Contact";
import { ProductPage } from "../ProductPage";
import { onSetActiveCostume } from "../../store/costumeSlice";
// import { useCartStore } from "../../hooks/useCartStore.js";

export const PublicPages = () => {
  const [showSidePanel, setShowSidePanel] = useState(false);
  // const {cartCostumes, startLoadingCostumesOnCart, setActiveCostumeOnCart, startSavingCostumeOnCart} = useCartStore()
  const dispatch = useDispatch();

// const onToggleSidePanel = (unsetActiveCostume) => {
const onToggleSidePanel = () => {
    setShowSidePanel((prev) => !prev);

    // if (unsetActiveCostume) {
      dispatch(onSetActiveCostume(null));
    // }
  };

  return (
    <>
      <Navbar
        showSidePanel={showSidePanel}
        onToggleSidePanel={onToggleSidePanel}

      />
      <Routes>
        <Route
          path="home"
          element={
            <Home
              onToggleSidePanel={onToggleSidePanel}
            />
          }
        />
        <Route
          path="collections"
          element={
            <Collections
              showSidePanel={showSidePanel}
              onToggleSidePanel={onToggleSidePanel}
            />
          }
        />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        {/* <Route path="teamMember/:id" element={<TeamMember />} />*/}
        <Route path="productPage/:id" element={<ProductPage />} />
        <Route path="/" element={<Navigate to={"home"} />} />
      </Routes>
    </>
  );
};
