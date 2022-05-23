import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Auth from "./Auth";

function Home({ children }) {
  return (
    <main className="h-main flex items-center justify-center mx-auto w-[80%]">
      {children}
    </main>
  );
}

export default Home;
