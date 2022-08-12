import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Homepage/Sidebar";
import View from "../components/Homepage/View";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsersData } from "../features/allUsersSlice/allUsersAction";


function Home() {




  return (
    <>
      <Header />
      <main className="homeHeight 
      flex items-start justify-start 
      text-black w-[100%] space-x-2 ">
        <Sidebar className="" />
        <View className="" />
      </main>
      
      <Footer />
    </>
  );
}

export default Home;
