import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../api/userApi";
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { getTabsSuccess } from "../features/selectedHomeTabs/tabsSlice";

function Header() {
  const {user} =useSelector(state => state.user)
  const dispatch = useDispatch();


  const [toggle, setToggle] = useState(false);
  const AdminLinkList = ["dashboard", "new_ticket", "/"];
  const commonUserLinkList =["new_ticket","Settings", "/"];
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
      

      {/* TopBar Icon */}
      <div>
      <Link to="/">
        <motion.div
          className=" text-[12px] sm:text-[15px] hover:text-amber-500"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.9 }}
          >Home</motion.div>
      </Link>
      </div>


      <div className="flex items-center justify-center pl-2 sm:pl-40 ">
      <Link to="#">
        <motion.div
          className="font-bold text-[12px] sm:text-[15px] border-b border-amber-600 shadow-lg"
          >Ticketing System</motion.div>
      </Link>
      </div>


      {/* TopBar list */}
      <div className="">
        <ul className="hidden sm:flex items-center justify-center text-white space-x-3 text-[12px]  ">


          {/*For Admins  */}
          {user.isAdmin? ["Dashboard", "new_ticket", "Logout"].map((item, index) => (
            <motion.li 
            className="px-1 hoverText" key={`link-${item}`}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}
            >
              <div className=" hover:border" />
              <Link to={`/${user.isAdmin? AdminLinkList[index]: commonUserLinkList[index] }`}>
                <div className="flex items-center justify-center  hover:text-amber-500"  
                onClick = {
                  item ==="Logout"? clickOnItem : item === "Settings"? dispatch(getTabsSuccess(item)) :() => setToggle(false) }>
                    { item === "new_ticket"? "New Ticket" :  item }
                </div>
              </Link>
            </motion.li> 
            ))
            
            // For Common Users
            : ["new_ticket", "Settings", "Logout"].map((item, index) => (
            <motion.li 
            className="px-1 hoverText" key={`link-${item}`}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}
            >
              <div className=" hover:border" />
              <Link to={`/${user.isAdmin? AdminLinkList[index]: commonUserLinkList[index] }`}>
                <div className="flex items-center justify-center  hover:text-amber-500"  
                onClick = {
                  item ==="Logout"? clickOnItem :() => setToggle(false) }>
                    { item === "new_ticket"? "New Ticket" :  item }
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>



        {/* SIDE BAR ICON & X  */}
        <div className=" sm:hidden h-[40px] relative flex items-center justify-center ]">
          
          {!toggle ? (
            <HiMenuAlt4
              className=" text-[#dde1e7] hover:text-[#519f8d] cursor-pointer mr-2 sm:mr-8 h-8 w-8"
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <motion.div 
            className="container z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
              <HiX
                className="hoverText m-3 w-[20px] h-[20px] cursor-pointer "
                onClick={() => setToggle(false)}
              />
            </motion.div>
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

              {/* For Admin */}
              {user.isAdmin? ["Dashboard", "new_ticket", "Logout"].map((item, index) => (
              <Link to={`/${user.isAdmin? AdminLinkList[index]: commonUserLinkList[index] }`}>
                  <motion.li
                    key={item}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.9 }}
                    className="hoverText w-full flex items-start justify-center  hover:text-amber-500"
                    onClick = {item ==="Logout"? clickOnItem : () => setToggle(false) }
                  >
                    { item === "new_ticket"? "New Ticket" :  item }
                  </motion.li>
                </Link>
            ))

            // For Common Users
              : ["new_ticket", "Settings", "Logout"].map((item, index) => (
                <Link to={`/${user.isAdmin? AdminLinkList[index]: commonUserLinkList[index] }`}>
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.9 }}
                  className="hoverText w-full flex items-start justify-center  hover:text-amber-500"
                  onClick = {item ==="Logout"? clickOnItem : () => setToggle(false) }
                >
                  { item === "new_ticket"? "New Ticket" :  item }
                </motion.li>
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
