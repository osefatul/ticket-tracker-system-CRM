import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Auth from "./Auth";

function Home({ children }) {
  return (
    <>
      <Header />

      <main className="h-main text-black flex items-center justify-center mx-auto w-[80%]">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Home;
