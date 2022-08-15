import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../api/userApi";

function Header() {
  const [toggle, setToggle] = useState(false);
  const linkList = ["dashboard", "new_ticket", "/"];
	const navigate = useNavigate ();


  const clickOnItem = ()=>{
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("crmSite");
    userLogout();
    setToggle(false)
    navigate("/auth")
  }

  return (
    <div className=" bg-slate-900 flex items-center justify-between px-6 h-[50px] fixed w-full top-0 z-50">
      {/* TOP BAR */}
      <div>
      <Link to="/">
        <div className="font-bold text-[15px]">Tickets-CRM</div>
      </Link>
      </div>

      <div className="">
        <ul className="hidden sm:flex items-center justify-center text-white space-x-3 text-[12px] px-10 ">
          {["Dashboard", "new_ticket", "Logout"].map((item, index) => (

            <li className="px-1 font-comorants hoverText" key={`link-${item}`}>
              <div className=" hover:border" />
              <Link to={`/${linkList[index]}`}>
                <div className="flex items-center justify-center"  
                onClick = {item ==="Logout"? clickOnItem : () => setToggle(false) }>
                    { item === "new_ticket"? "New Ticket" :  item }
                </div>
              </Link>
            </li>
          ))}
        </ul>


        {/* SIDE BAR ICON & X  */}
        <div className=" sm:hidden h-[40px] relative flex items-center justify-center ]">
          {!toggle ? (
            <HiMenuAlt4
              className=" text-[#dde1e7] hover:text-[#519f8d] cursor-pointer mr-8 h-8 w-8"
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <div className="container z-40">
              <HiX
                className="hoverText m-3 w-[20px] h-[20px] cursor-pointer "
                onClick={() => setToggle(false)}
              />
            </div>
          )}


          {/* SIDE BAR */}
          <div
            className={`fixed top-0 right-0 z-10 h-screen w-[40vw] 
            flex flex-col justify-end items-end 
            bg-[#0e214b] ${
              toggle ? "translate-x-0" : "translate-x-full"
            } ease-out duration-700  shadow-2xl`}
          >
            <ul className="h-[100%] w-full flex flex-col justify-start items-start space-y-5 mt-32 pl-5">
              {["Dashboard", "new_ticket", "Logout"].map((item, index) => (
                <Link key={item} to={`/${linkList[index]}`}>
                  <li
                    key={item}
                    className="hoverText w-[100%] flex items-start justify-center"
                    onClick = {item ==="Logout"? clickOnItem : () => setToggle(false) }
                  >
                    { item === "new_ticket"? "New Ticket" :  item }
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
