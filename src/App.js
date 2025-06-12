import React from "react";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import History from "./components/History";
import Founders from "./components/Founders";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Hero />
      <History />
      <Founders />
      <Menu />
      <Footer />
    </>
  );
}

export default App;
