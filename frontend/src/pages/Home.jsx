import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Homepage/Sidebar";
import View from "../components/Homepage/View";
import DashboardUpdated from "./DashboardUpdated";


function Home() {
  const {user} = useSelector(state => state.user)


  return (
    <>
      <Header />
      <main className={`homeHeight 
      flex ${user.isAdmin? "items-start justify-start": "items-center justify-center" } 
      text-black w-[100%] space-x-2 `}>

        {
          user.isAdmin ? <>
          <Sidebar className="" />
          <View user={user}/>
          </>:
          
          <DashboardUpdated />
        } 
      </main>
      
      <Footer />
    </>
  );
}

export default Home;
