import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./pages/AllFunction/CartFunction";

import Nav from "./pages/MainNavBar/Nav";
import Home from "./pages/Home/Home";
import Samsung from "./pages/MainNavBar/Samsung";
import LG from "./pages/MainNavBar/LG";
import OnSale from "./pages/MainNavBar/OnSale";
import NewArrivel from "./pages/MainNavBar/NewArrivel";
import Brands from "./pages/MainNavBar/Brands";
import Cart from "./pages/MainNavBar/Cart";
import Footer from "./pages/Footer/Footer";
import ProductDetails from "./pages/Productdetails/ProductDetails"; // ✅ পাথ ঠিক রাখো


function App() {
  return (
    <CartProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/samsung" element={<Samsung />} />
        <Route path="/lg" element={<LG />} />
        <Route path="/On-sale" element={<OnSale />} />
        <Route path="/New-arrivel" element={<NewArrivel />} />
         <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Brands" element={<Brands />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
