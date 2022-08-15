import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Homepage/Sidebar";
import View from "../components/Homepage/View";


function Home() {
  const {user} = useSelector(state => state.user)


  return (
    <>
      <Header />
      <main className="homeHeight 
      flex items-start justify-start 
      text-black w-[100%] space-x-2 ">

        {
          user.isAdmin ? <>
          <Sidebar className="" />
          <View user={user}/>
          </>: 
          <h1>Hi common users</h1>
        } 
      </main>
      
      <Footer />
    </>
  );
}

export default Home;
