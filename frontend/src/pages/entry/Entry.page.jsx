import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MainPage from "../../components/MainPage";
import Auth from "../auth/Auth";

function Entry() {
  return (
    <div className="bg-slate-800 h-screen">
      {/* <Auth /> */}
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default Entry;
