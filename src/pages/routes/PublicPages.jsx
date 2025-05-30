import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Home } from "../Home";
import { Collections } from "../Collections";
import { CheckoutPage } from "../CheckoutPage.jsx";
import { About } from "../About.jsx";
import { Contact } from "../Contact";
import { ProductPage } from "../ProductPage";
import { Banners } from "../Banners.jsx";
import { Categories } from "../Categories.jsx";
import { SuccessPage } from "../SuccessPage.jsx";
import { SalesList } from "../salesList.jsx";


export const PublicPages = () => {
  return (
    <>
      <Navbar/>
      <Routes >
        <Route
          path="home"
          element={<Home />}
        />
        <Route
          path="collections"
          element={<Collections/>}
        />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="productPage/:id" element={<ProductPage />} />
        <Route path="banners" element={<Banners/>} />
        <Route path="categories" element={<Categories/>} />
        <Route path="successPage" element={<SuccessPage/>} />
        <Route path="salesList" element={<SalesList />} />
        <Route path="/" element={<Navigate to={"home"} />} />
      </Routes>
    </>
  );
};
