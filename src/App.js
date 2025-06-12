import React from "react";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import History from "./components/History";
import Founders from "./components/Founders";
import { CartProvider } from "./components/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <ScrollToTop />
        <Navbar />
        <Hero />
        <History />
        <Founders />
        <Menu />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
