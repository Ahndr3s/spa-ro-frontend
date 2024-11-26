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
  const dispatch = useDispatch();

  const onToggleSidePanel = () => {
    setShowSidePanel((prev) => !prev);
    dispatch(onSetActiveCostume(null));
  };

  return (
    <>
      <Navbar/>
      <Routes>
        <Route
          path="home"
          element={<Home />}
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

        <Route path="productPage/:id" element={<ProductPage />} />
        <Route path="/" element={<Navigate to={"home"} />} />
      </Routes>
    </>
  );
};
